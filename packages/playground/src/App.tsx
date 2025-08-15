import "./App.css";
// import AntdStyles from "./demos/AntdStyles";
import ConfigurableTable from "./components/table/ConfigurableTable";
import { useExtendTranslation } from "./hooks/use-extend-translate";

function App() {
  const { t } = useExtendTranslation();
  return (
    <div className="app">
      <h2>App</h2>
      <div className="block">
        <p>{t("工号")}</p>
        <p>{t("借调单")}</p>
      </div>
      <main className="demo-box">
        {/* <AntdStyles /> */}
        <ConfigurableTable />
      </main>
    </div>
  );
}

export default App;
