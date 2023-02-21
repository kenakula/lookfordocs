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
