# Google Sheets Integration: Direct Contact Form Submission (No Supabase)

## Requirements & Prerequisites

To set up this integration in your project, you need:

- **A working website** built with React and Vite (already present in this project)
- **Google account** with access to Google Sheets and Apps Script
- **A Google Sheet** with columns:
  - Timestamp
  - Company Name
  - Contact Person
  - Phone Number
  - Email
  - Service Needed
  - Notes
  - Budget
- **Google Apps Script Web App** deployed and accessible (for webhook)
- **Frontend form** updated to collect all required fields and POST directly to the Apps Script Web App URL

**You will need:**

- Permission to deploy Apps Script as a Web App (set to "Anyone")
- The ability to update your frontend form to match the required fields

---

This document explains how to connect your website’s contact form directly to Google Sheets using a Google Apps Script Web App, with the following columns in your sheet:

- Timestamp
- Company Name
- Contact Person
- Phone Number
- Email
- Service Needed
- Notes
- Budget

This document explains how to connect your website’s contact form to Google Sheets using a Supabase Edge Function, with the following columns in your sheet:

- Timestamp
- Company Name
- Contact Person
- Phone Number
- Email
- Service Needed
- Notes
- Budget

---

## 1. Website Contact Form (Frontend)

Your form should collect the following fields:

- company_name (Company Name)
- contact_person (Contact Person)
- phone_number (Phone Number)
- email (Email)
- service_needed (Service Needed)
- notes (Notes)
- budget (Budget)

On submit, send a POST request to your Supabase Edge Function endpoint, e.g.:

```js
const form = {
  company_name: "Acme Corp",
  contact_person: "Jane Doe",
  phone_number: "+1-555-1234",
  email: "jane@acme.com",
  service_needed: "SEO Audit",
  notes: "Looking for a Q2 start",
  budget: "$5,000",
};

await supabase.functions.invoke("send-contact-email", { body: form });
```

---

## 2. Supabase Edge Function (Backend)

The Edge Function receives the form data, validates it, and:

- Stores it in the database (optional, but recommended)
- Sends it to Google Sheets via a webhook (Apps Script Web App)
- Optionally sends a notification email

**Mapping:**

- Timestamp: generated in the function (e.g., `new Date().toISOString()`)
- Company Name: `company_name`
- Contact Person: `contact_person`
- Phone Number: `phone_number`
- Email: `email`
- Service Needed: `service_needed`
- Notes: `notes`
- Budget: `budget`

**Example payload sent to Google Sheets webhook:**

```json
{
  "timestamp": "2026-03-22T12:34:56.789Z",
  "company_name": "Acme Corp",
  "contact_person": "Jane Doe",
  "phone_number": "+1-555-1234",
  "email": "jane@acme.com",
  "service_needed": "SEO Audit",
  "notes": "Looking for a Q2 start",
  "budget": "$5,000"
}
```

---

## 3. Google Sheets & Apps Script Setup

1. **Create a Google Sheet** with columns in this exact order:
   - Timestamp
   - Company Name
   - Contact Person
   - Phone Number
   - Email
   - Service Needed
   - Notes
   - Budget

2. **Create an Apps Script Web App** attached to the sheet. Example script:

```js
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.timestamp,
    data.company_name,
    data.contact_person,
    data.phone_number,
    data.email,
    data.service_needed,
    data.notes,
    data.budget,
  ]);
  return ContentService.createTextOutput("OK");
}
```

3. **Deploy the script as a Web App** (set access to "Anyone") and copy the URL.

4. **Set the webhook URL as a secret in Supabase:**

```sh
supabase secrets set GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/REPLACE/exec"
```

5. **Deploy your Edge Function:**

```sh
supabase functions deploy send-contact-email
```

---

## 4. End-to-End Flow

1. User submits the contact form on your website.
2. The frontend sends the data to the Supabase Edge Function.
3. The Edge Function:
   - Validates and stores the data (optional)
   - Sends a POST request to your Google Sheets webhook with the mapped fields
   - Optionally sends a notification email
4. The Apps Script receives the data and appends a new row to your sheet.

---

## 5. Notes

- If the webhook URL is not set, the function can still store leads in your database.
- You can add extra validation, spam filtering, or notification logic in the Edge Function as needed.
- For security, consider adding a shared secret header to the webhook and checking it in your Apps Script.

---

This setup ensures all contact form submissions are automatically logged in your Google Sheet with the exact columns you specified, providing a seamless integration from your website to your CRM or workflow.
