import axios from "axios";
import Layout from "../../components/layout/Layout";
import styles from "./Country.module.css";
const Country = ({ country }) => {
  return (
    <Layout title={country.name}>
      <div>
        <div className={styles.overview_panel}>
          <img src={country?.flag} alt={country?.name} />
          <h1 className={styles.overview_name}>{country?.name}</h1>
          <h1 className={styles.overview_region}>{country?.region}</h1>

          <div className={styles.overview_numbers}>
            <div className={styles.overview_population}>
              <div className={styles.overview_value}>{country?.population}</div>
              <div className={styles.overview_label}>Population</div>
            </div>
            <div className={styles.overview_area}>
              <div className={styles.overview_value}>{country?.area}</div>
              <div className={styles.overview_label}>Area </div>
            </div>
          </div>
        </div>

        <div className={styles.details_panel}>
          <h4 className={styles.details_panel_heading}>Details</h4>
          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>Capital</div>
            <div className={styles.details_panel_value}>{country?.capital}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Country;

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(
    `https://restcountries.eu/rest/v2/alpha/${params.id}`
  );

  return {
    props: {
      country: data,
    }, // will be passed to the page component as props
  };
}
