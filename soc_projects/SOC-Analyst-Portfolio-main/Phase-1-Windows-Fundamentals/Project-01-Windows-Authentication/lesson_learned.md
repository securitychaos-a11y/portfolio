# Lessons Learned

- Authentication events must be correlated rather than analyzed individually.

- Event ID 4625 alone does not indicate malicious activity.

- Event ID 4672 does not imply privilege escalation.

- Windows creates multiple successful logon events after login.

- Event timelines provide context.

- Splunk is significantly more efficient than manual Event Viewer investigation.

- SIEM field mappings should always be validated against the original Windows event.

- Windows Home with Microsoft Accounts may produce authentication events where the failed account name is unavailable.

- Never assume a detection is incorrect before validating the raw event.