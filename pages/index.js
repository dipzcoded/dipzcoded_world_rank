import Layout from "../components/layout/Layout";
import axios from "axios";
import styles from "../styles/Home.module.css";
import SearchInput from "../components/searchinput/SearchInput";
import CountriesTable from "../components/countriestable/CountriesTable";
import { useState } from "react";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");
  const filteredCountries = countries.filter(
    (el) =>
      el.name.toLowerCase().includes(keyword) ||
      el.region.toLowerCase().includes(keyword) ||
      el.subregion.toLowerCase().includes(keyword)
  );
  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>Found {countries.length} countries</div>
        <div className={styles.input}>
          <SearchInput
            placeholder="filter by Name,Region or SubRegion"
            onChange={onInputChange}
          />
        </div>
      </div>

      <CountriesTable countries={filteredCountries} keyword={keyword} />
    </Layout>
  );
}

export async function getStaticProps(context) {
  const { data } = await axios.get("https://restcountries.com/v2/all");

  return {
    props: { countries: data }, // will be passed to the page component as props
  };
}
