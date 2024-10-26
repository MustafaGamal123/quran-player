import NavigationSection from "./NavigationSection";
import classes from "./Layout.module.css";

function Layout(props) {
  return (
    <div>
      <div className={classes.navigationbar}>
        <NavigationSection />
      </div>
      <div className={classes.mainsection}>
        <main className={classes.main}>{props.children}</main>
      </div>
    </div>
  );
}

export default Layout;
