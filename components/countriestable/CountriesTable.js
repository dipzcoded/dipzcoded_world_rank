import { useState } from "react";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";
import styles from "./CountriesTable.module.css";
import Link from "next/link";

const orderBy = (countries, direction, value, page, resPerPage, keyword) => {
  const pageOn = (page - 1) * resPerPage;
  const resPageOn = resPerPage * page;

  if (keyword) {
    return [...countries];
  }
  if (!direction) {
    return [...countries].slice(pageOn, resPageOn);
  }
  if (direction === "asc") {
    return [...countries]
      .slice(pageOn, resPageOn)
      .sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }

  if (direction === "desc") {
    return [...countries]
      .slice(pageOn, resPageOn)
      .sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }
};

const SortArrow = ({ direction }) => {
  if (!direction) return <></>;
  if (direction === "desc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

const CountriesTable = ({ countries, keyword }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();
  const [page, setPage] = useState(1);
  const resPerPage = 50;
  const pages = Math.ceil(countries.length / resPerPage);

  const orderedCountries = orderBy(
    countries,
    direction,
    value,
    page,
    resPerPage,
    keyword
  );

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  console.log(page);
  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_flag}></div>
        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection("name")}
        >
          <div>Name</div>
          <SortArrow direction={value === "name" ? direction : null} />
        </button>

        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection("population")}
        >
          <div>Population</div>
          <SortArrow direction={value === "population" ? direction : null} />
        </button>

        <button
          className={styles.heading_area}
          onClick={() => setValueAndDirection("area")}
        >
          <div>
            Area (km<sup style={{ fontSize: "0.5rem" }}>2</sup>)
          </div>
          <SortArrow direction={value === "area" ? direction : null} />
        </button>

        <button
          className={styles.heading_gini}
          onClick={() => setValueAndDirection("gini")}
        >
          <div>Gini</div>
          <SortArrow direction={value === "gini" ? direction : null} />
        </button>
      </div>
      {orderedCountries?.map((country) => (
        <Link
          href={`/country/${country?.alpha3Code}`}
          as={`/country/${country?.alpha3Code}`}
          key={country?.name}
        >
          <div className={styles.row}>
            <div className={styles.flag}>
              <img src={country?.flag} alt={country?.name} />
            </div>
            <div className={styles.name}>{country?.name}</div>
            <div className={styles.population}>{country?.population}</div>
            <div className={styles.area}>{country?.area || 0}</div>
            <div className={styles.gini}>{country?.gini || 0}%</div>
          </div>
        </Link>
      ))}

      <div className={styles.pagination}>
        {!keyword &&
          [...new Array(pages)].map((el, index) => (
            <button
              className={`${styles.pagination_item} ${
                page === index + 1 && styles.active
              }`}
              type="button"
              value={index + 1}
              onClick={(e) => setPage(Number(e.target.value))}
            >
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

export default CountriesTable;
