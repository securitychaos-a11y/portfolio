## Detection Engineering ##

## Detection Objective

Detect multiple failed authentication attempts followed by successful login.

---

## Detection Logic

IF

Failed Logon Count >= 3

AND

Successful Logon occurs within short time

THEN

Generate Investigation Alert

---

## Severity

Medium

---

## MITRE

Credential Access

Initial Access

Account Discovery