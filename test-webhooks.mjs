const webhooks = {
  contact: process.env.GHL_CONTACT_WEBHOOK_URL,
  referral: process.env.GHL_REFERRAL_WEBHOOK_URL,
  carefinder: process.env.GHL_CAREFINDER_WEBHOOK_URL,
};

const payloads = {
  contact: { type: "contact", name: "Test Contact", email: "test-contact@example.com", phone: "1234567890", message: "This is a test message from node" },
  referral: { type: "referral", referrerName: "Test Referrer", referrerEmail: "referrer@example.com", referrerPhone: "1234567890", referrerRole: "GP", clientName: "Client Name", serviceType: "Nursing", notes: "Test referral" },
  carefinder: { type: "care-finder", seekingFor: "Myself", serviceType: "Nursing", name: "Test Carefinder", phone: "1234567890", email: "carefinder@example.com", notes: "Test care finder" }
};

async function testWebhooks() {
  for (const [name, url] of Object.entries(webhooks)) {
    if (!url) {
      console.log(`Skipping ${name}: webhook environment variable is not configured.`);
      continue;
    }
    console.log(`Testing ${name}...`);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloads[name])
      });
      console.log(`${name} response status:`, response.status);
      const text = await response.text();
      console.log(`${name} response body:`, text);
    } catch (err) {
      console.error(`${name} error:`, err);
    }
  }
}

testWebhooks();
