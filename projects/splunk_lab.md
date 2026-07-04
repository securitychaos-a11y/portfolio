# Security Monitoring and SIEM Lab

## Project Overview

This project demonstrates the deployment and configuration of two industry-leading Security Information and Event Management (SIEM) platforms: **Wazuh** and **Splunk**. The lab was designed to simulate a real-world Security Operations Center (SOC) environment by collecting, forwarding, indexing, and analyzing security events from multiple operating systems.

The environment consists of:
- A Wazuh server deployed on Ubuntu Server.
- A Windows 11 endpoint monitored by the Wazuh Agent.
- A Splunk Enterprise instance running on Windows 11.
- A Kali Linux virtual machine configured with the Splunk Universal Forwarder to send logs to Splunk Enterprise.

---

# Project 1: Wazuh Security Monitoring

## Objective

Deploy a centralized security monitoring solution using Wazuh to collect, analyze, and visualize Windows security events in real time.

## Architecture

```text
Windows 11 Host
│
├── Wazuh Agent
│
└── Ubuntu Server VM
    ├── Wazuh Manager
    ├── Wazuh Indexer
    └── Wazuh Dashboard
```

## Features

- Windows Event Log monitoring
- Failed login detection
- Successful login monitoring
- File Integrity Monitoring (FIM)
- Security event analysis
- Endpoint inventory
- Centralized alert management
- Interactive dashboards

---

# Project 2: Splunk Log Management

## Objective

Build a log management solution using Splunk Enterprise to collect and analyze logs generated from a Kali Linux virtual machine.

## Architecture

```text
Windows 11 Host
│
├── Splunk Enterprise
│
└── Kali Linux VM
    └── Splunk Universal Forwarder
            │
            ▼
     Splunk Enterprise
```

## Features

- Centralized log collection
- Linux system log monitoring
- Real-time log forwarding
- Search Processing Language (SPL) queries
- Dashboard creation
- Event indexing
- Security log analysis

---

# Technologies Used

| Component | Technology |
|-----------|------------|
| SIEM | Wazuh |
| SIEM | Splunk Enterprise |
| Server OS | Ubuntu Server |
| Endpoint OS | Windows 11 |
| Linux Endpoint | Kali Linux |
| Virtualization | VMware Workstation Pro, VirtualBox |
| Log Forwarder | Splunk Universal Forwarder |
| Agent | Wazuh Agent |

---

# Skills Demonstrated

- SIEM deployment
- Security monitoring
- Log management
- Endpoint monitoring
- Windows Event Log analysis
- Linux log collection
- Agent configuration
- Log forwarding
- Dashboard creation
- Security event investigation
- Basic SOC operations
- Virtual lab design

---

# Learning Outcomes

Through this project, I gained practical experience in:

- Deploying enterprise SIEM platforms.
- Configuring log forwarding between systems.
- Monitoring Windows and Linux endpoints.
- Investigating security events.
- Creating a functional SOC lab.
- Understanding centralized log management and threat detection workflows.

---

# Future Enhancements

- Integrate Sysmon with Wazuh.
- Configure Windows Event Forwarding (WEF).
- Add additional Linux endpoints.
- Deploy Active Directory for authentication monitoring.
- Integrate Suricata IDS.
- Integrate Zeek network monitoring.
- Build custom Wazuh detection rules.
- Develop advanced Splunk dashboards using SPL.
- Simulate attack scenarios and analyze detections.

---

# Conclusion

This project demonstrates the successful implementation of a multi-platform security monitoring lab using **Wazuh** and **Splunk**. By integrating Windows and Linux systems with centralized log collection and analysis, the environment closely resembles a real-world Security Operations Center (SOC). The lab provides practical experience in SIEM deployment, endpoint monitoring, threat detection, and incident investigation while strengthening skills relevant to SOC Analyst and Blue Team roles.