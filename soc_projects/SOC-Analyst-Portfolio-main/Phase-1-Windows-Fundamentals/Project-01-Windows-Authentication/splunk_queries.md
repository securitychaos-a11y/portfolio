# Splunk Queries

---

## Query 1

Verify data ingestion

```spl
index=*
```

---

## Query 2

Find authentication events

```spl
index=* EventCode=4624 OR EventCode=4625 OR EventCode=4672
```

---

## Query 3

Failed logons

```spl
index=* EventCode=4625
```

---

## Query 4

Successful logons

```spl
index=* EventCode=4624
```

---

## Query 5

Special Logons

```spl
index=* EventCode=4672
```

---

## Query 6

Count failed logons

```spl
index=* EventCode=4625
| stats count by Account_Name
```

---

## Observation

The Windows event itself contained

```
Account Name: -
```

Therefore Splunk correctly indexed the original event.

The unexpected username was not caused by SPL.