export const getJobTypeLabel = (type: string) => {
  const mapping: Record<string, string> = {
    FULL_TIME: "Penuh Waktu",
    PART_TIME: "Paruh Waktu",
    INTERNSHIP: "Magang",
    CONTRACT: "Kontrak",
    FREELANCE: "Lepas",
    TEMPORARY: "Sementara",
  };
  return mapping[type] || type;
};
