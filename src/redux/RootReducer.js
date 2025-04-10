import { combineReducers } from "redux";
import { favoriteReducer } from "./favorite/FavoriteReducer";
import { HomeReducer } from "./smi/home/HomeReducer";
import { ApplyCampaignHomeReducer } from "./smi/home/ApplyCampaignFromHomeReducer";
import { InfluencerReducer } from "./smi/influencer/InfluencerReducer";
import { CampaignReducer } from "./smi/campaign/CampaignReducer";
import { ApplyCampaignReducer } from "./smi/campaign/ApplyCampaignReducer";
import { MyCampaignReducer } from "./smi/myCampaign/MyCampaignReducer";
import { proposalReducer } from "./smi/proposal/ProposalReducer";
import { BusinessHomeReducer } from "./business/Home/BusinessHomeReducer";
import { BusinessInfluencerReducer } from "./business/influencer/BusinessInfluencerReducer";
import { BusinessCampaignReducer } from "./business/Campaign/BusinessCampaignReducer";
import { BusinessProposalsReducer } from "./business/Proposals/BusinessProposalsReducer";
import { SearchReducer } from "./Search/SearchReducer";

const appReducer = combineReducers({
  favoriteReducer: favoriteReducer,
  HomeReducer: HomeReducer,
  ApplyCampaignHomeReducer:ApplyCampaignHomeReducer,
  CampaignReducer: CampaignReducer,
  ApplyCampaignReducer:ApplyCampaignReducer,
  InfluencerReducer:InfluencerReducer,
  MyCampaignReducer:MyCampaignReducer,
  proposalReducer:proposalReducer,
  BusinessHomeReducer:BusinessHomeReducer,
  BusinessInfluencerReducer:BusinessInfluencerReducer,
  BusinessCampaignReducer:BusinessCampaignReducer,
  BusinessProposalsReducer:BusinessProposalsReducer,
  SearchReducer:SearchReducer,
});

const rootreducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = undefined;
  }
  return appReducer(state, action);
};


export default rootreducer;
