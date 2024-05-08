export const validatePhoneNumber = (value: string, dialingCode?: string | null) => {
  if (!dialingCode) return true;

  const regexMap: Record<string, RegExp[]> = {
    "+61": [/^0?[2-578]\d{8}$/], // Australia
    "+84": [/^0?[1-9]\d{8,9}$/], // Vietnam
    "+91": [/^[789]\d{9}$/], // India
  };
  const regexes = regexMap[dialingCode];
  return !regexes || !regexes.some((regex) => regex.test(value)) ? "Invalid contact number" : true;
};

