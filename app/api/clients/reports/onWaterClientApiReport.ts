const baseUrl =
  (import.meta as any).env?.VITE_API_URL?.replace(/\/$/, "") ||
  (process.env as any)?.VITE_API_URL?.replace(/\/$/, "") ||
  "http://myaccount.xolog.com:5055";

const getData = async (queryString?: string) => {
  try {
    // Get token from cookies (client-side; for SSR you can pass via headers from loader)
    let cookie: string | undefined = undefined;
    if (typeof document !== "undefined") {
      cookie = document.cookie || "";
    }

    let token: string | null = null;
    if (cookie) {
      const parts = cookie.split(/;\s*/);
      for (const p of parts) {
        const [k, ...rest] = p.split("=");
        if (k === "authToken") {
          token = decodeURIComponent(rest.join("="));
          break;
        }
      }
    }
    // Avoid logging token values in production; only note presence
    console.log("Using token:", token ? "present" : "null");

    if (!token) {
      throw new Response("Not authorized, no token", { status: 401 });
    }

    const response = await fetch(   
      `${baseUrl}/api/v1/clients/on-water${queryString ? `?${queryString}` : ""}`,
      {
        method: "GET",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch on-water jobs");
    }

  const data = await response.json();
  return data;
  } catch (error) {
  console.error("getData error", error);
  return [];
  }
};

// Client-side function to fetch ongoing jobs (for React components)
export async function fetchOngoingJobs(
  params: {
    page?: number;
    limit?: number;
    jobStatusType?: string;
    token?: string;
    fullPaid?: string;
    statusType?: string;
    departmentId?: number;
    jobType?: number;
  } = {}
) {
  try {
    // Build query parameters
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.set("page", params.page.toString());
    if (params.limit) queryParams.set("limit", params.limit.toString());
    if (params.jobStatusType)
      queryParams.set("jobStatusType", params.jobStatusType);
    if (params.statusType) queryParams.set("statusType", params.statusType);
    if (params.departmentId)
      queryParams.set("departmentId", params.departmentId.toString());
    if (params.fullPaid)
      queryParams.set("fullPaid", params.fullPaid.toString());
    if (params.jobType) queryParams.set("jobType", params.jobType.toString());

    // Get the query string
    const queryString = queryParams.toString();

  const data = await getData(queryString);
  return Array.isArray(data) ? data : (data as any)?.data || (data as any)?.items || [];
  } catch (error: unknown) {
    console.error("Error fetching ongoing jobs:", error);

    throw error;
  }
}

