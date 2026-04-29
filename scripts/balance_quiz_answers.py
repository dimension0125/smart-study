import json
import random
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
            target_answers = [0, 1, 2, 3] * 5
            rng = random.Random(section["id"])
            rng.shuffle(target_answers)

            # Avoid obvious 1-2-3-4 or 4-3-2-1 runs inside a section.
            for _ in range(200):
                if not has_obvious_run(target_answers):
                    break
                rng.shuffle(target_answers)

            section_index = 0
            for level in ("basic", "advanced"):
                for item in section["quiz"][level]:
                    # Keep five answers per option number in each section, but
                    # randomize the order so students cannot infer a pattern.
                    target_answer_index = target_answers[section_index]
                    current_answer_index = item["correctAnswer"]
                    offset = (current_answer_index - target_answer_index) % len(item["options"])
                    rotate_options(item, offset)
                    section_index += 1

    CONTENT.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def has_obvious_run(values):
    for i in range(len(values) - 3):
        window = values[i : i + 4]
        if window in ([0, 1, 2, 3], [3, 2, 1, 0]):
            return True
    return False


if __name__ == "__main__":
    main()
