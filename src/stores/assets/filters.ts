import { ClinicsFilterQuery, DoctorsFilterQuery } from '../types';

export const getDoctorsFilterString = (search: string): string => `
  {
    "_or": [
      {
        "firstName": {
          "_contains": "${search}"
        }
      },
      {
        "lastName": {
          "_contains": "${search}"
        }
      },
      {
        "specialties": {
          "specialties_id": {
            "title": {
              "_contains": "${search}"
            }
          }
        }
      }
    ]
  }
`;

export const getSpecialtiesFilterString = (search: string): string => `
  {
    "title": {
      "_contains": "${search}"
    }
  }
`;

export const getClinicsFilterString = (search: string): string => `
  {
    "name": {
      "_contains": "${search}"
    }
  }
`;

export const getInsurancesFilterString = (search: string): string => `
  {
    "name": {
      "_contains": "${search}"
    }
  }
`;

export const getGlobalServicesFilterString = (search: string): string => `
  {
    "name": {
      "_contains": "${search}"
    }
  }
`;

export const getLanguagesFilterString = (search: string): string => `
  {
    "name": {
      "_contains": "${search}"
    }
  }
`;

export const getDoctorsQueryString = (query: DoctorsFilterQuery): string => {
  const nameString = query.name
    ? `
        {
          "_or": [
            {
              "firstName": {
                "_contains": "${query.name}"
              }
            },
            {
              "lastName": {
                "_contains": "${query.name}"
              }
            }
          ]
        }
      `
    : '';

  const specialtyArr = query.specialty ? query.specialty.split(',') : [];
  const specialtyString = specialtyArr.length
    ? `
        {
          "_or": [
            ${specialtyArr.map(
              spec =>
                `
                  {
                    "specialties": {
                      "specialties_id": {
                        "id": {
                          "_eq": "${spec}"
                        }
                      }
                    }
                  }
                `,
            )}
          ]
        }
      `
    : '';

  const insuranceArr = query.insurance ? query.insurance.split(',') : [];
  const insuranceString = insuranceArr.length
    ? `
        {
          "_or": [
            ${insuranceArr.map(
              ins =>
                `
                  {
                    "insurances": {
                      "insurances_id": {
                        "id": {
                          "_eq": "${ins}"
                        }
                      }
                    }
                  }
                `,
            )}
          ]
        }
      `
    : '';

  const clinicsArr = query.clinic ? query.clinic.split(',') : [];
  const clinicsString = clinicsArr.length
    ? `
        {
          "_or": [
            ${clinicsArr.map(
              clinic =>
                `
                  {
                    "clinics": {
                      "clinics_id": {
                        "id": {
                          "_eq": "${clinic}"
                        }
                      }
                    }
                  }
                `,
            )}
          ]
        }
      `
    : '';

  const serviceArr = query.service ? query.service.split(',') : [];
  const serviceString = serviceArr.length
    ? `
        {
          "_or": [
            ${serviceArr.map(
              service =>
                `
                  {
                    "globalServices": {
                      "globalServices_id": {
                        "id": {
                          "_eq": "${service}"
                        }
                      }
                    }
                  }
                `,
            )}
          ]
        }
      `
    : '';

  const langArr = query.lang ? query.lang.split(',') : [];
  const langString = langArr.length
    ? `
        {
          "_or": [
            ${langArr.map(
              lang =>
                `
                  {
                    "lang": {
                      "languages_id": {
                        "id": {
                          "_eq": "${lang}"
                        }
                      }
                    }
                  }
                `,
            )}
          ]
        }
      `
    : '';

  const string = [
    nameString,
    specialtyString,
    insuranceString,
    clinicsString,
    langString,
    serviceString,
  ]
    .filter(str => Boolean(str.length))
    .join(',');

  return `
    {
      "_and": [
        ${string}
      ]
    }
  `;
};

export const getClinicsQueryString = (query: ClinicsFilterQuery): string => {
  const nameString = query.name
    ? `
        {
          "name": {
            "_contains": "${query.name}"
          }
        }
      `
    : '';

  const specialtyArr = query.specialty ? query.specialty.split(',') : [];
  const specialtyString = specialtyArr.length
    ? `
        {
          "_or": [
            ${specialtyArr.map(
              spec =>
                `
                  {
                    "specialties": {
                      "specialties_id": {
                        "id": {
                          "_eq": "${spec}"
                        }
                      }
                    }
                  }
                `,
            )}
          ]
        }
      `
    : '';

  const insuranceArr = query.insurance ? query.insurance.split(',') : [];
  const insuranceString = insuranceArr.length
    ? `
        {
          "_or": [
            ${insuranceArr.map(
              ins =>
                `
                  {
                    "insurances": {
                      "insurances_id": {
                        "id": {
                          "_eq": "${ins}"
                        }
                      }
                    }
                  }
                `,
            )}
          ]
        }
      `
    : '';

  const serviceArr = query.service ? query.service.split(',') : [];
  const serviceString = serviceArr.length
    ? `
        {
          "_or": [
            ${serviceArr.map(
              service =>
                `
                  {
                    "globalServices": {
                      "globalServices_id": {
                        "id": {
                          "_eq": "${service}"
                        }
                      }
                    }
                  }
                `,
            )}
          ]
        }
      `
    : '';

  const langArr = query.lang ? query.lang.split(',') : [];
  const langString = langArr.length
    ? `
        {
          "_or": [
            ${langArr.map(
              lang =>
                `
                  {
                    "lang": {
                      "languages_id": {
                        "id": {
                          "_eq": "${lang}"
                        }
                      }
                    }
                  }
                `,
            )}
          ]
        }
      `
    : '';

  const string = [
    nameString,
    specialtyString,
    insuranceString,
    langString,
    serviceString,
  ]
    .filter(str => Boolean(str.length))
    .join(',');

  return `
    {
      "_and": [
        ${string}
      ]
    }
  `;
};
