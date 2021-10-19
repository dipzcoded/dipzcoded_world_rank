import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import styles from "./Country.module.css";

const getCountryInfo = async (id) => {
  const { data } = await axios.get(`https://restcountries.com/v2/alpha/${id}`);
  return data;
};

const Country = ({ country }) => {
  const [borders, setBorders] = useState([]);

  const getBorder = async () => {
    const borders = await Promise.all(
      country?.borders.map((el) => getCountryInfo(el))
    );
    setBorders(borders);
  };

  useEffect(() => {
    getBorder();
  }, []);

  return (
    <Layout title={country.name}>
      <div className={styles.container}>
        <div className={styles.container_left}>
          <div className={styles.overview_panel}>
            <img src={country?.flag} alt={country?.name} />
            <h1 className={styles.overview_name}>{country?.name}</h1>
            <h1 className={styles.overview_region}>{country?.region}</h1>

            <div className={styles.overview_numbers}>
              <div className={styles.overview_population}>
                <div className={styles.overview_value}>
                  {country?.population}
                </div>
                <div className={styles.overview_label}>Population</div>
              </div>
              <div className={styles.overview_area}>
                <div className={styles.overview_value}>{country?.area}</div>
                <div className={styles.overview_label}>Area </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container_right}>
          <div className={styles.details_panel}>
            <h4 className={styles.details_panel_heading}>Details</h4>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Capital</div>
              <div className={styles.details_panel_value}>
                {country?.capital}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Languages</div>
              <div className={styles.details_panel_value}>
                {country?.languages.map(({ name }) => name).join(", ")}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Currency</div>
              <div className={styles.details_panel_value}>
                {country?.currencies.map(({ name }) => name).join(", ")}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Native name</div>
              <div className={styles.details_panel_value}>
                {country?.nativeName}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Gini</div>
              <div className={styles.details_panel_value}>{country?.gini}%</div>
            </div>

            <div className={styles.details_panel_borders}>
              <div className={styles.details_panel_borders_label}>
                Neighbouring Countries
              </div>
              <div className={styles.details_panel_borders_container}>
                {borders?.map(({ flag, name }) => (
                  <div className={styles.details_panel_borders_country}>
                    <img src={flag} alt={name} />
                    <div className={styles.details_panel_borders_name}>
                      {name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Country;

export const getStaticPaths = async () => {
  const { data: countries } = await axios.get(
    "https://restcountries.com/v2/all"
  );
  const paths = countries.map((el) => ({
    params: { id: el.alpha3Code },
  }));

  return {
    paths,
    fallback: false,
  };
};

// export  function getServerSideProps = async ({params}) => {
//   const res = await axios.get("")
// }

export async function getStaticProps({ params }) {
  const countryData = await getCountryInfo(params.id);

  return {
    props: {
      country: countryData,
    }, // will be passed to the page component as props
  };
}
