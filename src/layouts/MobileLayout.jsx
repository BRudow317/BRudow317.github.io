/**
 * @TODO Implement a mobile layout
 */

// import { SideNav } from "../features/SideNav/SideNav.jsx";
import { Outlet 
//, useLocation 
} from "react-router-dom";
// import { TopBar } from "../features/TopBar/TopBar.jsx";

export function MobileLayout() {
  // const location = useLocation();

  // const styles = {
  //   App: {
  //     display: "flex",
  //     flexDirection: "row",
  //     minHeight: "100dvh",
  //     height: "100%",
  //   },
  //   Main: {
  //     display: "flex",
  //     flexDirection: "column",
  //     width: "100%",
  //     height: "100%",
  //   },
  //   Content: {
  //     padding: "18px",
  //     width: "100%",
  //     height: "100%",
  //     borderTop: "2px solid var(--border-1)",
  //     borderLeft: "2px solid var(--border-1)",
  //   },
  // };

  return (<Outlet />);

    
    // <main style={styles.App}>
    //   <SideNav />

    //   <div style={styles.Main} role="main">
    //     <TopBar />
    //     <div style={styles.Content}>
    //       <div className="fadein" key={location.pathname}>
    //         <Outlet />
    //       </div>
    //     </div>
    //   </div>
    // </main>
  //);
}
