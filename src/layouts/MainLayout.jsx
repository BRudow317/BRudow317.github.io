import { NavBar } from "../features/NavBar/NavBar.jsx";
import { Outlet } from "react-router-dom";
// import { MainBackground } from "../components/Shells/Background/MainBackground.jsx";
import { SiteShell } from "../components/Shells/SiteShell/SiteShell";
// import { Header } from "../components/Shells/Header/Header";
// import { Footer } from "../components/Shells/Footer/Footer";
// import { ContentShell } from "../components/Shells/ContentShell/ContentShell";

const htmlEl = document.documentElement;

const styles = window.getComputedStyle(htmlEl);
// window.getComputedStyle(element)
// window.getComputedStyle(element, pseudoElt)

//matchMedia("(width <= 600px)")

// 3. Extract your specific breakpoint variable
const mdBreakpoint = styles.getPropertyValue('--breakpoint-md').trim(); 


function MainLayout() {
  return (
    <>
      {/* <MainBackground /> */}
      <SiteShell>
        <NavBar />
        {/* <Header /> */}
        {/* <ContentShell> */}
          <Outlet />
        {/* </ContentShell> */}
        {/* <Footer /> */}
      </SiteShell>
    </>
  );
}
export { MainLayout };
