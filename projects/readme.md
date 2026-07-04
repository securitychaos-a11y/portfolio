# 🛡️ Project 01 – Windows Authentication Investigation

> **SOC Home Lab Project**
> Windows Security Logs • Splunk Enterprise • Wazuh • Sysmon • Event Correlation

---

# 📖 Overview

This project focuses on investigating Windows authentication events within a SOC home lab environment.

The primary objective is to understand how Windows records authentication attempts, how these events are collected by Splunk and Wazuh, and how a SOC analyst reconstructs authentication activity using Windows Security Logs.

Rather than memorizing Event IDs, this project emphasizes understanding the complete authentication workflow and performing evidence-based investigations.

---

# 🎯 Objectives

* Understand the Windows authentication process.
* Investigate failed and successful logons.
* Analyze Windows Security Event Logs.
* Learn how Splunk ingests Windows events.
* Correlate authentication events into a timeline.
* Distinguish between legitimate user activity and suspicious authentication attempts.
* Build investigation documentation similar to real SOC workflows.

---

# 🖥️ Lab Environment

| Component                | Technology              |
| ------------------------ | ----------------------- |
| Host Operating System    | Windows 11              |
| SIEM                     | Splunk Enterprise       |
| Endpoint Telemetry       | Sysmon                  |
| Host Intrusion Detection | Wazuh Agent             |
| Wazuh Server             | Ubuntu Server VM        |
| Attacker Machine         | Kali Linux (VirtualBox) |
| Virtualization Platform  | VirtualBox              |

---

# 🏗️ Lab Architecture

```text
                        Internet
                            │
                    Windows Host Machine
        ┌────────────────────────────────────┐
        │ Splunk Enterprise                  │
        │ Sysmon                             │
        │ Wazuh Agent                        │
        │ Windows Security Event Logs        │
        └────────────────┬───────────────────┘
                         │
                Splunk Universal Forwarder
                         │
              ┌──────────┴──────────┐
              │                     │
      Kali Linux VM          Ubuntu Server VM
      (Attacker)             (Wazuh Server)
```

---

# 🔐 Windows Authentication Flow

```text
User enters Username & Password
                │
                ▼
           Winlogon
                │
                ▼
             LSASS
                │
                ▼
 Authentication Package
     (NTLM / Kerberos)
                │
                ▼
 Authentication Decision
        │              │
        ▼              ▼
 Success          Failure
        │              │
        └──────┬───────┘
               ▼
 Windows Security Log
               │
               ▼
 Splunk Universal Forwarder
               │
               ▼
        Splunk Enterprise
               │
               ▼
        SOC Investigation
```

---

# 📚 Concepts Covered

* Windows Authentication
* Winlogon
* LSASS
* Windows Security Event Logs
* Event Viewer Investigation
* Authentication Timeline Reconstruction
* Event Correlation
* Splunk Data Ingestion
* Windows Security Monitoring
* SOC Investigation Workflow

---

# 📋 Windows Authentication Event IDs

| Event ID | Description                 |
| -------- | --------------------------- |
| 4624     | Successful Logon            |
| 4625     | Failed Logon                |
| 4634     | Logoff                      |
| 4647     | User Initiated Logoff       |
| 4672     | Special Privileges Assigned |
| 4740     | Account Lockout             |

---

# 🔑 Windows Logon Types

| Logon Type | Description              |
| ---------- | ------------------------ |
| 2          | Interactive Logon        |
| 3          | Network Logon            |
| 4          | Batch Logon              |
| 5          | Service Logon            |
| 7          | Workstation Unlock       |
| 8          | NetworkCleartext         |
| 10         | Remote Interactive (RDP) |
| 11         | Cached Interactive       |

---

# 🔎 Investigation Workflow

```text
Generate Authentication Activity

        │
        ▼

Windows Security Logs

        │
        ▼

Event Viewer Investigation

        │
        ▼

Splunk Investigation

        │
        ▼

Wazuh Investigation

        │
        ▼

Timeline Reconstruction

        │
        ▼

SOC Analysis

        │
        ▼

Incident Report
```

---

# 📁 Project Structure

```text
Project-01-Windows-Authentication/
│
├── README.md
├── Investigation.md
├── Splunk-Queries.md
├── Wazuh-Rules.md
├── Commands.md
├── Timeline.md
├── IOC.md
├── MITRE-Mapping.md
├── Incident-Report.md
│
└── Screenshots/
```

---

# 🧪 Practical Activities Performed

* Installed and configured Sysmon.
* Verified Sysmon telemetry.
* Generated failed authentication events.
* Generated successful authentication events.
* Investigated Windows Security Logs.
* Filtered authentication Event IDs.
* Examined Event 4625 in detail.
* Correlated multiple authentication events.
* Built an authentication timeline.
* Prepared the environment for Splunk investigation.

---

# 🛠️ Tools Used

* Windows Event Viewer
* Splunk Enterprise
* Wazuh
* Sysmon
* Kali Linux
* VirtualBox
* Command Prompt
* PowerShell

---

# 📈 Skills Demonstrated

* Windows Security Log Analysis
* Authentication Investigation
* Event Correlation
* Timeline Reconstruction
* Endpoint Monitoring
* Splunk Fundamentals
* SOC Documentation
* Windows Security Fundamentals
* Incident Analysis

---

# 📌 Current Project Status

| Task                          | Status         |
| ----------------------------- | -------------- |
| Sysmon Installation           | ✅ Completed    |
| Event Viewer Investigation    | ✅ Completed    |
| Authentication Event Analysis | ✅ Completed    |
| Timeline Reconstruction       | ✅ Completed    |
| Splunk Investigation          | 🚧 In Progress |
| Wazuh Investigation           | ⏳ Pending      |
| Detection Engineering         | ⏳ Pending      |
| Incident Report               | ⏳ Pending      |
| MITRE ATT&CK Mapping          | ⏳ Pending      |

---

# 📖 References

* Microsoft Windows Security Auditing Documentation
* Microsoft Sysinternals – Sysmon
* Splunk Enterprise Documentation
* Wazuh Documentation
* MITRE ATT&CK Framework

---

# 👨‍💻 Author

**Aadhithyan K M**

SOC Analyst Learning Journey

This repository documents hands-on SOC investigations performed within a personal cybersecurity home lab. Each project focuses on practical investigation techniques, event analysis, SIEM usage, and incident response methodologies.
