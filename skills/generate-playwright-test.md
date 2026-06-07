# Skill: Generate Playwright Test

Input:
- context.md
- plan.md
- traceability-map.json
- agent.md

Output:
- Page object files
- Playwright spec files

Rules:
- Use TypeScript.
- Use Page Object Model.
- Use stable locators.
- Use Playwright expect.
- Add story ID and test case ID in test metadata.
- Do not use waitForTimeout.
- Reuse existing fixtures.
- Usec existing style of coding format