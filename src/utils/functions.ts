import { UpdateAddressInput } from 'types/vendure';


export const formatPrice = (intPrice: number): string => {
    const priceStr = intPrice.toString();
    const cents = priceStr.substr(-2);
    return priceStr.substring(0, priceStr.lastIndexOf(cents)) + `.${cents}`;
};

export const validateEmail = (email: string): boolean => {
    if (!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {
        return false;
    } else {
        return true;
    }
};

export const addressValidation = (input: UpdateAddressInput): boolean => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:
            JSON.stringify({
                "AccessRequest": {
                    "AccessLicenseNumber": "CD8C99ABC34D8CFD",
                    "UserId": "auraticd",
                    "Password": "d82u@K0re8LsmPkm!mQ3l2"
                },
                "AddressValidationRequest": {
                    "Request": {
                        "TransactionReference": {
                            "CustomerContext": "Your Customer Context",
                        },
                        "RequestAction": "AV"
                    },
                    "Address": {
                        "City": "ALPHARETTA",
                        "StateProvinceCode": "GA",
                        "PostalCode": "30005"
                    }
                }
            })
    };
    fetch('https://onlinetools.ups.com/rest/AV/', requestOptions)
        .then(response => {
            console.log(response);
        });
    return false;
}

export const getShipment = (input: UpdateAddressInput): boolean => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body:
            JSON.stringify({
                "AccessRequest": {
                    "AccessLicenseNumber": "CD8C99ABC34D8CFD",
                    "UserId": "auraticd",
                    "Password": "d82u@K0re8LsmPkm!mQ3l2",
                    "tranId": "tranid123",
                    "transactionSrc": "transSrc",

                },
                "ShipmentRequest": {
                    "Shipment": {
                        "Description": "1206 PTR",
                        "Shipper": {
                            "Name": "ShipperName",
                            "AttentionName": "AttentionName",
                            "TaxIdentificationNumber": "TaxID",
                            "Phone": {
                                "Number": "1234567890"
                            },
                            "ShipperNumber": "ShipperNumber",
                            "Address": {
                                "AddressLine": "AddressLine",
                                "City": "City",
                                "StateProvinceCode": "StateProvince",
                                "PostalCode": "PostalCode",
                                "CountryCode": "CountryCode"
                            }
                        },
                        "ShipTo": {
                            "Name": "ShipToName",
                            "AttentionName": "AttentionName",
                            "Phone": {
                                "Number": "1234567890"
                            },
                            "FaxNumber": "1234567999",
                            "TaxIdentificationNumber": "456999",
                            "Address": {
                                "AddressLine": "AddressLine",
                                "City": "City",
                                "StateProvinceCode": "StateProvince",
                                "PostalCode": "PostalCode",
                                "CountryCode": "CountryCode"
                            }
                        },
                        "ShipFrom": {
                            "Name": "ShipperName",
                            "AttentionName": "AttentionName",
                            "Phone": {
                                "Number": "1234567890"
                            },
                            "FaxNumber": "1234567999",
                            "TaxIdentificationNumber": "456999",
                            "Address": {
                                "AddressLine": "AddressLine",
                                "City": "City",
                                "StateProvinceCode": "StateProvince",
                                "PostalCode": "PsotalCode",
                                "CountryCode": "CountryCode"
                            }
                        },
                        "PaymentInformation": {
                            "ShipmentCharge": {
                                "Type": "01",
                                "BillShipper": {
                                    "AccountNumber": "AccountNumber"
                                }
                            }
                        },
                        "Service": {
                            "Code": "01",
                            "Description": "Expedited"
                        },
                        "Package": [{
                            "Description": "International Goods",
                            "Packaging": {
                                "Code": "02"
                            },
                            "PackageWeight": {
                                "UnitOfMeasurement": {
                                    "Code": "LBS"
                                },
                                "Weight": "10"
                            },
                            "PackageServiceOptions": ""
                        },
                        {
                            "Description": "International Goods",
                            "Packaging": {
                                "Code": "02"
                            },
                            "PackageWeight": {
                                "UnitOfMeasurement": {
                                    "Code": "LBS"
                                },
                                "Weight": "20"
                            },
                            "PackageServiceOptions": ""
                        }]
                        ,
                        "ItemizedChargesRequestedIndicator": "",
                        "RatingMethodRequestedIndicator": "",
                        "TaxInformationIndicator": "",
                        "ShipmentRatingOptions": {
                            "NegotiatedRatesIndicator": ""
                        }
                    },
                    "LabelSpecification": {
                        "LabelImageFormat": {
                            "Code": "GIF"
                        }
                    }
                }
            })
    };
    fetch('https://onlinetools.ups.com/ship/v1/shipments?additionaladdressvalidation=city', requestOptions)
        .then(response => {
            console.log(response);
        });
    return false;
}