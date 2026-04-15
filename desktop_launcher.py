import os
import threading
import time
from pathlib import Path

import webview
from waitress import serve


def app_data_dir() -> Path:
    base = Path(os.getenv("APPDATA", str(Path.home()))) / "LeadScript"
    base.mkdir(parents=True, exist_ok=True)
    return base


def run_server(port: int) -> None:
    from app import create_app

    flask_app = create_app()
    serve(flask_app, host="127.0.0.1", port=port)


def main() -> None:
    # Persist DB outside onefile temp extraction dir.
    os.environ.setdefault("LEADSCRIPT_DB_PATH", str(app_data_dir() / "leadscript.db"))
    os.environ.setdefault("PORT", "5050")
    port = int(os.getenv("PORT", "5050"))
    url = f"http://127.0.0.1:{port}"

    server_thread = threading.Thread(target=run_server, args=(port,), daemon=True)
    server_thread.start()

    # Let the local server boot before rendering the native app window.
    time.sleep(1.0)

    webview.create_window(
        "LeadScript",
        url,
        width=1280,
        height=820,
        min_size=(1024, 680),
        text_select=True,
    )
    webview.start()


if __name__ == "__main__":
    main()
