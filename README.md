# OSAP Lite: Ontario Student Aid Simulator

A lightweight React-based simulation of the Ontario Student Assistance Program (OSAP) part-time application system. Designed for demonstrating UI automation, form workflows, and CI integration.

## 🚀 Features

* Multi-step application form mimicking OSAP (school info, marital status, income, summary)
* Real-time validation and conditional fields
* React Context for global form state management
* End-to-End (E2E) testing using Selenium WebDriver (Python)
* GitHub Actions CI/CD: Auto-run tests on every push
* Tailwind CSS for layout styling

## 📂 Project Structure

```
osap-lite-automation/
├── public/
├── src/
│   ├── assets/
│   ├── pages/                  # Step1School, Step2Marital, Step3Income, SummaryPage
│   ├── App.jsx
│   ├── AppContext.jsx         # Global state for form
│   ├── AppLayout.jsx
│   └── main.jsx
├── tests/
│   └── test_osap_flow.py      # Selenium E2E test
├── .github/workflows/
│   └── e2e.yml                # GitHub Actions CI config
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🚩 Technologies Used

* **Frontend**: React + Vite + Tailwind CSS
* **Testing**: Selenium (Python)
* **CI/CD**: GitHub Actions

## 🎓 Usage

### Run locally

```bash
git clone https://github.com/your-username/osap-lite-automation
cd osap-lite-automation
npm install
npm run dev
```

### Run tests locally

```bash
# Ensure your frontend is running locally (default: http://localhost:5174)
cd tests
python test_osap_flow.py
```

### CI/CD

On every push to `main`, GitHub Actions:

* Installs dependencies
* Launches local web server
* Runs Selenium E2E test

## 💼 Author

Amanda Wu


