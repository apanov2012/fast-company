import httpService from "./http.service";

const qualityEndPoint = "quality/";
const qualityService = {
    getAllQualities: async () => {
        const { data } = await httpService.get(qualityEndPoint);
        return data;
    }
};

export default qualityService;
