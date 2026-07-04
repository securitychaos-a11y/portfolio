# Authentication Timeline

## Objective

Reconstruct the sequence of authentication events generated during the investigation.

| Time | Event ID | Description |
|------|----------|-------------|
|07:09:29|4625|Failed interactive logon|
|07:09:32|4625|Failed interactive logon|
|07:09:33|4625|Failed interactive logon|
|07:09:36|4624|Successful interactive logon|
|07:09:36|4672|Special privileges assigned|
|07:09:37+|4624|Additional Windows logon sessions|

---

## Timeline Analysis

The authentication sequence indicates:

- Three consecutive failed password attempts.
- Successful authentication immediately afterward.
- Administrative privileges assigned to the authenticated account.
- Additional Windows logon sessions created as part of the normal login process.

No abnormal sequence was observed.