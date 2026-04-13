import os
import sys
import threading
import webbrowser
from pathlib import Path

from waitress import serve


def app_data_dir() -> Path:
    base = Path(os.getenv("APPDATA", str(Path.home()))) / "LeadScript"
    base.mkdir(parents=True, exist_ok=True)
    return base


def open_browser_later(url: str) -> None:
    def _open():
        webbrowser.open(url)

    timer = threading.Timer(1.2, _open)
    timer.daemon = True
    timer.start()


def main() -> None:
    # Persist DB outside onefile temp extraction dir.
    os.environ.setdefault("LEADSCRIPT_DB_PATH", str(app_data_dir() / "leadscript.db"))
    os.environ.setdefault("PORT", "5050")

    from app import create_app

    flask_app = create_app()
    port = int(os.getenv("PORT", "5050"))
    url = f"http://127.0.0.1:{port}"
    open_browser_later(url)
    serve(flask_app, host="127.0.0.1", port=port)


if __name__ == "__main__":
    main()
