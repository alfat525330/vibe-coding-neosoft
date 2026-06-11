# Vibe Coding Protocol: TOKEN-SAVE ACTIVE

## 1. Interaction Rules
* **Brevity:** Use short-form responses. Zero conversational filler, pleasantries, or meta-explanations.
* **Diff-Only:** Provide only the specific diff or the modified function/block. Do not output the entire file.
* **No Side-Effects:** Do not update secondary files (README, logs, tests) unless explicitly requested in the prompt.
* **Status Only:** If a task is complete, reply: "[DONE]". If a question is asked, reply with the answer and nothing else.

## 2. Code Style
* **Compact Mode:** Use compact code style. Remove excessive whitespace, boilerplate, and comments.
* **No Explanations:** Do not explain why code was changed unless the logic is non-obvious or confidence is <90%.
* **Import Handling:** Do not list unchanged imports. Use `// ... existing imports` to save vertical space.

## 3. Hallucination Guard (Ref: Optimized Rules)
* **Verify First:** If requirements are vague, list [FACT], [ASSUMPTION], and [RECOMMENDATION] tags.
* **Stop on Doubt:** If confidence <100%, ask specific questions immediately. Do not guess.

---
## Token/Session Handshake
* **Timestamp:** 2026-06-11T07:42:41+05:30
* **Phase:** Initializing Frontend Setup (root `/frontend` folder)
* **Status:** Validated docs. Raised styling and language clarifying questions. Awaiting setup execution approval.