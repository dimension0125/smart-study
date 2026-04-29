import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "study_content.json"


def rotate_options(quiz, offset):
    options = quiz["options"]
    correct_option = options[quiz["correctAnswer"]]
    offset = offset % len(options)
    rotated = options[offset:] + options[:offset]
    quiz["options"] = rotated
    quiz["correctAnswer"] = rotated.index(correct_option)


def main():
    data = json.loads(CONTENT.read_text(encoding="utf-8"))
    for chapter in data["chapters"]:
        for section in chapter["sections"]:
            section_index = 0
            for level in ("basic", "advanced"):
                for item in section["quiz"][level]:
                    # Deterministic pattern: answers cycle through 1, 2, 3, 4
                    # while preserving the same correct option text.
                    target_answer_index = section_index % len(item["options"])
                    current_answer_index = item["correctAnswer"]
                    offset = (current_answer_index - target_answer_index) % len(item["options"])
                    rotate_options(item, offset)
                    section_index += 1

    CONTENT.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
