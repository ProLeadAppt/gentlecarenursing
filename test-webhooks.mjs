

const webhooks = {
  contact: "https://services.leadconnectorhq.com/hooks/7UPJe3L1GjcRcKMn1ONh/webhook-trigger/f85cdd65-ecf1-4d35-bf4d-4443a28c2bbc",
  referral: "https://services.leadconnectorhq.com/hooks/7UPJe3L1GjcRcKMn1ONh/webhook-trigger/c4f328f9-7528-4c6a-8fa9-7346433cd9df",
  carefinder: "https://services.leadconnectorhq.com/hooks/7UPJe3L1GjcRcKMn1ONh/webhook-trigger/51e4eb16-5111-4d22-8e9c-e62be73961e1"
};

const payloads = {
  contact: { type: "contact", name: "Test Contact", email: "test-contact@example.com", phone: "1234567890", message: "This is a test message from node" },
  referral: { type: "referral", referrerName: "Test Referrer", referrerEmail: "referrer@example.com", referrerPhone: "1234567890", referrerRole: "GP", clientName: "Client Name", serviceType: "Nursing", notes: "Test referral" },
  carefinder: { type: "care-finder", seekingFor: "Myself", serviceType: "Nursing", name: "Test Carefinder", phone: "1234567890", email: "carefinder@example.com", notes: "Test care finder" }
};

async function testWebhooks() {
  for (const [name, url] of Object.entries(webhooks)) {
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
