import { useEffect, useState } from "react";

type WilayahProps = {
  provinceId?: string;
  cityId?: string;
  districtId?: string;
};

export const useWilayah = ({
  provinceId,
  cityId,
  districtId,
}: WilayahProps) => {
  const [provinces, setProvinces] = useState<{ id: string; name: string }[]>(
    []
  );
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const [districts, setDistricts] = useState<{ id: string; name: string }[]>(
    []
  );
  const [villages, setVillages] = useState<{ id: string; name: string }[]>([]);

  const fetchProvinces = async () => {
    const res = await fetch(
      "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
    );
    const data = await res.json();
    setProvinces(data);
  };

  const fetchCities = async (provId: string) => {
    const res = await fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provId}.json`
    );
    const data = await res.json();
    setCities(data);
  };

  const fetchDistricts = async (cityId: string) => {
    const res = await fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${cityId}.json`
    );
    const data = await res.json();
    setDistricts(data);
  };

  const fetchVillages = async (districtId: string) => {
    const res = await fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json`
    );
    const data = await res.json();
    setVillages(data);
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (provinceId) fetchCities(provinceId);
  }, [provinceId]);

  useEffect(() => {
    if (cityId) fetchDistricts(cityId);
  }, [cityId]);

  useEffect(() => {
    if (districtId) fetchVillages(districtId);
  }, [districtId]);

  return {
    provinceOptions: provinces,
    cityOptions: cities,
    districtOptions: districts,
    villageOptions: villages,
    fetchCities,
    fetchDistricts,
    fetchVillages,
  };
};
