"""Every spelling of an em or en dash must fail the structural check."""

import importlib.util
import shutil
import tempfile
import unittest
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent


def load_mod():
    spec = importlib.util.spec_from_file_location(
        "check_skill_dashes", REPO / "scripts" / "check_skill.py"
    )
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def text_errors(markdown, name="README.md"):
    mod = load_mod()
    root = Path(tempfile.mkdtemp())
    try:
        (root / name).write_text(markdown, encoding="utf-8")
        old = mod.ROOT
        mod.ROOT = root
        errors = []
        try:
            mod.check_text(errors)
        finally:
            mod.ROOT = old
        return errors
    finally:
        shutil.rmtree(root)


EM_SPELLINGS = (chr(0x2014), "&mdash;", "&#8212;", "&#08212;", "&#x2014;", "&#X2014;", "&#x02014;")
EN_SPELLINGS = (chr(0x2013), "&ndash;", "&#8211;", "&#08211;", "&#x2013;", "&#X2013;", "&#x02013;")


class DashEntityTest(unittest.TestCase):
    def test_every_em_dash_spelling_fails(self):
        for spelling in EM_SPELLINGS:
            for name in ("README.md", "banner.html"):
                with self.subTest(spelling=spelling, file=name):
                    errors = text_errors(f"one{spelling}two\n", name)
                    self.assertIn(f"{name}:1: em dash", errors)

    def test_every_en_dash_spelling_fails(self):
        for spelling in EN_SPELLINGS:
            for name in ("README.md", "banner.html"):
                with self.subTest(spelling=spelling, file=name):
                    errors = text_errors(f"one{spelling}two\n", name)
                    self.assertIn(f"{name}:1: en dash", errors)

    def test_hyphens_and_other_entities_pass(self):
        errors = text_errors("well-known &amp; &#x2010; &#8209; &#x20140;\n")
        self.assertFalse(any("dash" in e for e in errors), errors)


if __name__ == "__main__":
    unittest.main()
