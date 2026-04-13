import os
import sys
import tempfile
import importlib
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))


def build_client():
    db_fd, db_path = tempfile.mkstemp(prefix="leadscript_test_", suffix=".db")
    os.close(db_fd)
    os.environ["LEADSCRIPT_DB_PATH"] = db_path
    import app as app_module
    importlib.reload(app_module)
    flask_app = app_module.create_app()
    flask_app.config["TESTING"] = True
    return flask_app.test_client(), db_path


def auth_headers(token):
    return {"Authorization": f"Bearer {token}"}


def test_full_flow():
    client, db_path = build_client()

    reg = client.post(
        "/api/auth/register",
        json={"email": "test@example.com", "password": "password123", "name": "QA"},
    )
    assert reg.status_code == 200
    token = reg.get_json()["token"]

    me = client.get("/api/auth/me", headers=auth_headers(token))
    assert me.status_code == 200

    p = client.post(
        "/api/projects",
        headers=auth_headers(token),
        json={"title": "Project A", "status": "draft", "tags": ["test"]},
    )
    assert p.status_code == 201
    project_id = p.get_json()["id"]

    chat = client.post(
        "/api/chats/message",
        headers=auth_headers(token),
        json={
            "project_id": project_id,
            "text": "Need ad script",
            "style": "balanced",
            "detail": "standard",
            "focus": "content",
            "creativity": "medium",
        },
    )
    assert chat.status_code == 200
    assert "reply" in chat.get_json()

    gen = client.post(
        "/api/scripts/generate",
        headers=auth_headers(token),
        json={
            "idea": "Coffee app ad",
            "mode": "tiktok",
            "submode": "sales",
            "niche": "food",
            "audience": "students",
            "tone": "energetic",
            "goal": "installs",
            "language": "en",
            "platform": "TikTok",
        },
    )
    assert gen.status_code == 200
    script = gen.get_json()["script"]
    assert "SCRIPT" in script

    save = client.post(
        "/api/scripts/save",
        headers=auth_headers(token),
        json={
            "project_id": project_id,
            "title": "Script 1",
            "content": script,
            "language": "en",
            "mode": "tiktok",
            "tags": ["ads"],
        },
    )
    assert save.status_code == 200
    script_id = save.get_json()["id"]

    version = client.post(
        f"/api/scripts/{script_id}/version",
        headers=auth_headers(token),
        json={"content": script + "\nUpdate"},
    )
    assert version.status_code == 200
    assert version.get_json()["version"] == 2

    qa_platform = client.post(
        "/api/qa/analyze",
        headers=auth_headers(token),
        json={
            "analysis_type": "platform_check",
            "platform": "TikTok",
            "script": "hook in 2 sec with trend and cta keyword",
        },
    )
    assert qa_platform.status_code == 200
    assert "score" in qa_platform.get_json()

    qa_budget = client.post(
        "/api/qa/analyze",
        headers=auth_headers(token),
        json={
            "analysis_type": "budget_estimate",
            "budget": "mid",
            "region": "US",
            "script": "Scene 1 INT room\nScene 2 EXT street chase",
        },
    )
    assert qa_budget.status_code == 200
    assert qa_budget.get_json()["total"] > 0

    export_txt = client.get(
        f"/api/scripts/{script_id}/export?format=txt",
        headers=auth_headers(token),
    )
    assert export_txt.status_code == 200

    export_pdf = client.get(
        f"/api/scripts/{script_id}/export?format=pdf",
        headers=auth_headers(token),
    )
    assert export_pdf.status_code == 200
    assert export_pdf.data.startswith(b"%PDF")

    export_docx = client.get(
        f"/api/scripts/{script_id}/export?format=docx",
        headers=auth_headers(token),
    )
    assert export_docx.status_code == 200
    assert export_docx.data.startswith(b"PK")
