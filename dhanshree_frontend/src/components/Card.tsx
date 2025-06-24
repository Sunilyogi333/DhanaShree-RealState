"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import {
  faLocationDot,
  faRoad,
  faHouse,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { fetchPropertyDetails } from "@/types/property";
import { useTranslation } from "react-i18next";
import { englishToNepaliNumber, nepaliToEnglishNumber } from "@/utils/numberUtils";
import { formatAddressByLanguage } from "@/utils/formatAddressByLanguage";
import { formatNumberByLanguage } from "@/utils/formatNumberByLanguage";

function Cardfm({ property }: { property: fetchPropertyDetails }) {
    const { t ,i18n} = useTranslation();

  return (
    <Link href={`/List/${property.type}/${property.id}`}>
        <Card className="lg:w-[400px] h-[550px] w-full shadow-xl relative pt-0 group cursor-pointer gap-4">
          <div className="group h-2/3 relative">
            <img
              src={property.images[0].url}
              alt={property.type}
              className="rounded-tl-lg rounded-tr-lg h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-20"></div>
          </div>

          <button className="absolute bg-green-700 text-white text-sm rounded-lg p-3 top-1 start-1">
          {t(`enum.status.${property.status}`)}
          </button>

          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center mb-1">
                <h1 className="font-bold text-sm text-green-500">
                  {property.propertyCode}
                </h1>
                <span className="text-sm bg-sky-300 text-white rounded-lg px-2 py-1">
                  {t(`enum.type.${property.type}`)}
                </span>
              </div>
                <h1 className="font-semibold text-lg">
                {t(`enum.type.${property.type}`)} {t("for")} {t(`enum.purpose.${property.purpose}`)} {t("in")}{" "}
                <span className="text-sky-500">{t("rs")} {formatNumberByLanguage(property.price, i18n.language)}</span>
                </h1>
            </CardTitle>
            <CardDescription className="flex flex-col space-y-2 mt-2 ">
      <div className="flex items-center gap-2 lg:w-[300px] overflow-hidden">
  <FontAwesomeIcon icon={faLocationDot} />
  <span className=" overflow-hidden  truncate ">
    {/* {t("location")}: {property.address?.municipality?.municipalityTitle},
    {property.address?.district?.districtTitle},
    {property.address?.province?.provinceTitle} */}
     {t("location")}: {formatAddressByLanguage(property?.address as any, i18n.language)}
  </span>
</div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faRoad} style={{ color: "#74C0FC" }} />
                {t("road")}: {formatNumberByLanguage(property.details.frontage.value, i18n.language)}{" "}
                {t(`enum.unit.${property.details.frontage.unit}`)}
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faHouse} style={{ color: "#74C0FC" }} />
                {t("area")}: {formatNumberByLanguage(property.details.landArea.value, i18n.language)}{" "}
                {t(`enum.unit.${property.details.landArea.unit}`)}
              </div>
            </CardDescription>
          </CardHeader>

          <CardContent />
        </Card>
    </Link>
  );
}

export default Cardfm;
export { Cardfm as Card };