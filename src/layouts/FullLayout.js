import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";

const FullLayout = (token) => {

  return (
    <main>
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </aside>
        {/********Content Area**********/}

        <div className="contentArea">
          {/********header**********/}
          <Header token={token}/>
          {/********Middle Content**********/}
          <Container className="px-0 wrapper" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
