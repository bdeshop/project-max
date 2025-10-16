import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import RootLayout from "../RootLayout/RootLayout";
import AccountSummary from "../pages/AccountSummary/AccountSummary";
import Banking from "../pages/Banking/Banking";
import Master from "../pages/Master/Master";
import MotherAdmin from "../pages/MotherAdmin/MotherAdmin";
import SubAdmin from "../pages/SubAdmin/SubAdmin";
import BetList from "../pages/BetList/BetList";
import SubAgent from "../pages/SubAgent/SubAgent";
import Profile from "../pages/Profile/Profile";
import Agent from "../pages/Agent/Agent";
import AccountStatement from "../pages/AccountStatement/AccountStatement";
import ActiveLog from "../pages/ActiveLog/ActiveLog";
import LiveBet from "../pages/LiveBet/LiveBet";
import BlockMarket from "../pages/BlockMarket/BlockMarket";
import B2CAgentList from "../pages/B2CAgentList/B2CAgentList";
import SearchUsers from "../pages/SearchUsers/SearchUsers";
import ProfitLossReportByDownLine from "../pages/Reports/ProfitLossReportByDownLine";
import ProfitLossReportByParlayDownLine from "../pages/Reports/ProfitLossReportByParlayDownLine";
import SummaryProfitLossReport from "../pages/Reports/SummaryProfitLossReport";
import ProfitLossReportByMarket from "../pages/Reports/ProfitLossReportByMarket";
import ProfitLossReportByPlayer from "../pages/Reports/ProfitLossReportByPlayer";
import ProfitLossReportByAllCasino from "../pages/Reports/ProfitLossReportByAllCasino";
import ProfitLossReportByCasinoDownLine from "../pages/Reports/ProfitLossReportByCasinoDownLine";
import SpinHistory from "../pages/Reports/SpinHistory";
import PendingSpinUsers from "../pages/Reports/PendingSpinUsers";
import UserRefCommisionReport from "../pages/Reports/UserRefCommisionReport";
import UserReferralList from "../pages/Reports/UserReferralList";
import RiskManagement from "../pages/Managements/RiskManagement";
import MM from "../pages/Managements/MM";
import Settings from "../pages/Managements/Settings";
import PSettings from "../pages/Managements/PSettings";
import Ticker from "../pages/Managements/Ticker";
import PopTicker from "../pages/Managements/PopTicker";
import Social from "../pages/Managements/Social";
import UploadBanner from "../pages/Managements/UploadBanner";
import PBets from "../pages/Managements/CasinoControls/PBets";
import AWCCasinoBets from "../pages/Managements/CasinoControls/AWCCasinoBets";
import BOCasinoBets from "../pages/Managements/CasinoControls/BOCasinoBets";
import BetGamesBets from "../pages/Managements/CasinoControls/BetGamesBets";
import AWCCasinoProducts from "../pages/Managements/CasinoControls/AWCCasinoProducts";
import MotherAdminRoute from "../routes/MotherAdminRoute";
import MotherAdminLogin from "../pages/Logins/MotherAdminLogin/MotherAdminLogin";
import CreatedAdminList from "../pages/AllAdminList/CreatedAdminList/CreatedAdminList";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <MotherAdminRoute>
            <Home></Home>
          </MotherAdminRoute>
        ),
      },
      {
        path: "account-summary",
        element: (
          <MotherAdminRoute>
            {" "}
            <AccountSummary />{" "}
          </MotherAdminRoute>
        ),
      },
      {
        path: "banking",
        element: (
          <MotherAdminRoute>
            <Banking />{" "}
          </MotherAdminRoute>
        ),
      },
      {
        path: "master",
        element: (
          <MotherAdminRoute>
            {" "}
            <Master></Master>{" "}
          </MotherAdminRoute>
        ),
      },
      {
        path: "mother-admin",
        element: (
          <MotherAdminRoute>
            <MotherAdmin></MotherAdmin>
          </MotherAdminRoute>
        ),
      },
      {
        path: "/created-admins/:creatorId",
        element: (
          <MotherAdminRoute>
            <CreatedAdminList></CreatedAdminList>
          </MotherAdminRoute>
        ),
      },
      {
        path: "sub-admin",
        element: (
          <MotherAdminRoute>
            {" "}
            <SubAdmin></SubAdmin>{" "}
          </MotherAdminRoute>
        ),
      },
      {
        path: "agent",
        element: (
          <MotherAdminRoute>
            {" "}
            <Agent></Agent>{" "}
          </MotherAdminRoute>
        ),
      },
      {
        path: "bet-list",
        element: (
          <MotherAdminRoute>
            {" "}
            <BetList></BetList>{" "}
          </MotherAdminRoute>
        ),
      },
      {
        path: "sub-agent",
        element: (
          <MotherAdminRoute>
            <SubAgent></SubAgent>
          </MotherAdminRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <MotherAdminRoute>
            {" "}
            <Profile></Profile>
          </MotherAdminRoute>
        ),
      },
      {
        path: "account-statement",
        element: (
          <MotherAdminRoute>
            <AccountStatement></AccountStatement>
          </MotherAdminRoute>
        ),
      },
      {
        path: "active-log",
        element: (
          <MotherAdminRoute>
            {" "}
            <ActiveLog></ActiveLog>
          </MotherAdminRoute>
        ),
      },
      {
        path: "live-bet",
        element: (
          <MotherAdminRoute>
            <LiveBet></LiveBet>
          </MotherAdminRoute>
        ),
      },
      {
        path: "block-market",
        element: (
          <MotherAdminRoute>
            {" "}
            <BlockMarket></BlockMarket>
          </MotherAdminRoute>
        ),
      },
      {
        path: "b2c-agent-list",
        element: (
          <MotherAdminRoute>
            <B2CAgentList></B2CAgentList>
          </MotherAdminRoute>
        ),
      },
      {
        path: "search-users",
        element: (
          <MotherAdminRoute>
            <SearchUsers></SearchUsers>
          </MotherAdminRoute>
        ),
      },
      {
        path: "my-report-pnl-downline",
        element: (
          <MotherAdminRoute>
            {" "}
            <ProfitLossReportByDownLine></ProfitLossReportByDownLine>
          </MotherAdminRoute>
        ),
      },
      {
        path: "my-report-parlay-downline",
        element: (
          <MotherAdminRoute>
            {" "}
            <ProfitLossReportByParlayDownLine></ProfitLossReportByParlayDownLine>{" "}
          </MotherAdminRoute>
        ),
      },
      {
        path: "my-report-summary-pnl",
        element: (
          <MotherAdminRoute>
            <SummaryProfitLossReport></SummaryProfitLossReport>{" "}
          </MotherAdminRoute>
        ),
      },
      {
        path: "my-report-pl-market",
        element: (
          <MotherAdminRoute>
            <ProfitLossReportByMarket></ProfitLossReportByMarket>
          </MotherAdminRoute>
        ),
      },
      {
        path: "my-report-pl-player",
        element: (
          <MotherAdminRoute>
            <ProfitLossReportByPlayer></ProfitLossReportByPlayer>
          </MotherAdminRoute>
        ),
      },
      {
        path: "my-report-pl-casino",
        element: (
          <MotherAdminRoute>
            <ProfitLossReportByAllCasino></ProfitLossReportByAllCasino>
          </MotherAdminRoute>
        ),
      },
      {
        path: "my-report-pnl-casino-downline",
        element: (
          <MotherAdminRoute>
            {" "}
            <ProfitLossReportByCasinoDownLine></ProfitLossReportByCasinoDownLine>
          </MotherAdminRoute>
        ),
      },
      {
        path: "my-report-spin",
        element: (
          <MotherAdminRoute>
            <SpinHistory></SpinHistory>
          </MotherAdminRoute>
        ),
      },
      {
        path: "my-report-spinList",
        element: (
          <MotherAdminRoute>
            {" "}
            <PendingSpinUsers></PendingSpinUsers>
          </MotherAdminRoute>
        ),
      },
      {
        path: "my-report-PlAgentRef",
        element: (
          <MotherAdminRoute>
            <UserRefCommisionReport></UserRefCommisionReport>
          </MotherAdminRoute>
        ),
      },
      {
        path: "my-report-user-referral-list",
        element: (
          <MotherAdminRoute>
            {" "}
            <UserReferralList></UserReferralList>{" "}
          </MotherAdminRoute>
        ),
      },
      {
        path: "risk-management",
        element: (
          <MotherAdminRoute>
            {" "}
            <RiskManagement></RiskManagement>{" "}
          </MotherAdminRoute>
        ),
      },
      {
        path: "mm",
        element: (
          <MotherAdminRoute>
            <MM></MM>{" "}
          </MotherAdminRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <MotherAdminRoute>
            <Settings></Settings>
          </MotherAdminRoute>
        ),
      },
      {
        path: "p-settings",
        element: (
          <MotherAdminRoute>
            <PSettings></PSettings>
          </MotherAdminRoute>
        ),
      },
      {
        path: "ticker",
        element: (
          <MotherAdminRoute>
            <Ticker></Ticker>
          </MotherAdminRoute>
        ),
      },
      {
        path: "pop-ticker",
        element: (
          <MotherAdminRoute>
            <PopTicker></PopTicker>
          </MotherAdminRoute>
        ),
      },
      {
        path: "social",
        element: (
          <MotherAdminRoute>
            <Social></Social>
          </MotherAdminRoute>
        ),
      },
      {
        path: "upload-banner",
        element: (
          <MotherAdminRoute>
            {" "}
            <UploadBanner></UploadBanner>
          </MotherAdminRoute>
        ),
      },
      {
        path: "p-bets",
        element: (
          <MotherAdminRoute>
            <PBets></PBets>
          </MotherAdminRoute>
        ),
      },
      {
        path: "awc-casino-bets",
        element: (
          <MotherAdminRoute>
            <AWCCasinoBets></AWCCasinoBets>
          </MotherAdminRoute>
        ),
      },
      {
        path: "bo-casino-bets",
        element: (
          <MotherAdminRoute>
            {" "}
            <BOCasinoBets></BOCasinoBets>
          </MotherAdminRoute>
        ),
      },
      {
        path: "bet-games-bets",
        element: (
          <MotherAdminRoute>
            <BetGamesBets></BetGamesBets>
          </MotherAdminRoute>
        ),
      },
      {
        path: "awc-casino-products",
        element: (
          <MotherAdminRoute>
            {" "}
            <AWCCasinoProducts></AWCCasinoProducts>
          </MotherAdminRoute>
        ),
      },
    ],
  },
  {
    path: "ad-login",
    element: <MotherAdminLogin></MotherAdminLogin>,
  },
  
]);
