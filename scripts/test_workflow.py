"""CI must run the eval suite, not only the structural check."""

import unittest
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
WORKFLOW = REPO / ".github" / "workflows" / "check.yml"


class WorkflowTest(unittest.TestCase):
    def test_ci_runs_eval_suite_and_unit_tests(self):
        text = WORKFLOW.read_text(encoding="utf-8")
        self.assertIn("npm run evals", text)
        self.assertIn("npm test", text)
        self.assertIn("actions/setup-node@v7", text)


if __name__ == "__main__":
    unittest.main()
