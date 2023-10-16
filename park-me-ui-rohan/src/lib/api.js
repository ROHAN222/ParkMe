const PARK_ME_API = process.env.PARK_ME_SERVICE_URI
  ? process.env.PARK_ME_SERVICE_URI
  : "http://localhost:9092/parking";

export async function getAllSlotsByType(requestData) {
  const response = await fetch(`${PARK_ME_API}/available/${requestData.type}`, {
    headers: {
      Authorization: `Bearer ${requestData.token}`,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch slots.");
  }

  return data;
}

export async function assignParking(requestData) {
  const response = await fetch(`${PARK_ME_API}/assign`, {
    method: "POST",
    body: JSON.stringify(requestData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${requestData.token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not assign parking.");
  }

  return null;
}

export async function calculateBill(requestData) {
  const response = await fetch(`${PARK_ME_API}/bill`, {
    method: "POST",
    body: JSON.stringify(requestData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${requestData.token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch bill.");
  }

  return data;
}

export async function exitParking(requestData) {
  const response = await fetch(
    `${PARK_ME_API}/exit/${requestData.transactionId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${requestData.token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not exit.");
  }

  return data;
}
