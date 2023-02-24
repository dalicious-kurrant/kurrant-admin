//TODO: API URL 변경
//TODO: Hook 분리
//TODO: axios로 변경
import {API_BASE_URL, DOMAIN} from '../shared/recommendation-constants';

export const recommendationApis = {
  getModelInfo: async () => {
    const version = 'present';
    const url = DOMAIN + API_BASE_URL + `/recommendation/models/${version}`;
    const res = await fetch(url);
    const json = await res.json();
    return {
      version: json.model_info.version,
      startDate: json.model_info.start_date,
      endDate: json.model_info.end_date,
    };
  },

  getGroups: async ({version}) => {
    const url = DOMAIN + API_BASE_URL + `/recommendation/groups?`;
    const params = new URLSearchParams({
      version: version,
    }).toString();

    const res = await fetch(url + params);
    const json = await res.json();
    return json.groups.map(group =>
      Object({
        id: group.id,
        name: group.name,
        location: {
          address: group.location.address,
          point: {
            longitude: group.location.point.longitude,
            latitude: group.location.point.latitude,
          },
        },
      }),
    );
  },

  getDiningTypes: async ({version}) => {
    const url = DOMAIN + API_BASE_URL + `/recommendation/dining-types?`;
    const params = new URLSearchParams({
      version: version,
    }).toString();

    const res = await fetch(url + params);
    const json = await res.json();
    return json.dining_types.map(diningType =>
      Object({id: diningType.id, name: diningType.name}),
    );
  },

  getMakers: async ({version, date, group, diningType}) => {
    const url = DOMAIN + API_BASE_URL + `/recommendation/makers?`;
    const params = new URLSearchParams({
      version: version,
      date: date,
      dining_type: diningType,
      group: group,
    }).toString();

    const res = await fetch(url + params);
    const json = await res.json();
    return json.makers.map(maker =>
      Object({
        id: maker.id,
        name: maker.name,
        recommended: maker.recommended,
        score: maker.score,
        location: {
          address: maker.location.address,
          point: {
            longitude: maker.location.point.longitude,
            latitude: maker.location.point.latitude,
          },
        },
      }),
    );
  },

  getFoods: async ({version, date, group, diningType}) => {
    const url = DOMAIN + API_BASE_URL + `/recommendation/foods?`;

    const params = new URLSearchParams({
      version: version,
      date: date,
      dining_type: diningType,
      group: group,
    }).toString();

    const res = await fetch(url + params);
    const json = await res.json();
    return json.foods.map(food =>
      Object({
        id: food.id,
        name: food.name,
        maker: {id: food.maker.id},
        recommended: food.recommended,
        score: food.score,
        price: food.price,
        description: food.description,
        allergies: food.allergies,
        image: food.image,
      }),
    );
  },

  getPersonalRecommendation: async ({
    version,
    date,
    group,
    diningType,
    makers,
    foods,
  }) => {
    const url = DOMAIN + API_BASE_URL + `/recommendation/recommend/personal?`;

    const params = new URLSearchParams({
      version: version,
      date: date,
      dining_type: diningType,
      group: group,
      makers: makers,
      foods: foods,
    }).toString();

    const res = await fetch(url + params);
    const json = await res.json();
    return json.results.map(result =>
      Object({
        user: {id: result.user.id, name: result.user.name},
        food: {
          id: result.food.id,
          name: result.food.name,
          score: result.food.score,
        },
      }),
    );
  },

  getLearningState: async () => {
    const url = DOMAIN + API_BASE_URL + `/recommendation/models/learning-state`;

    const res = await fetch(url);
    const json = await res.json();
    return {
      code: json.learning_state.code,
      name: json.learning_state.name,
      startDate: json.learning_state.start_date,
    };
  },

  callStartLearning: async () => {
    const url = DOMAIN + API_BASE_URL + `/recommendation/models/start-learning`;

    const res = await fetch(url);
    const json = await res.json();
    return {
      code: json.learning_state.code,
      name: json.learning_state.name,
    };
  },

  callStopLearning: async () => {
    const url = DOMAIN + API_BASE_URL + `/recommendation/models/stop-learning`;

    const res = await fetch(url);
    const json = await res.json();
    return {
      code: json.learning_state.code,
      name: json.learning_state.name,
    };
  },

  getModels: async () => {
    const url = DOMAIN + API_BASE_URL + `/recommendation/models`;

    const res = await fetch(url);
    const json = await res.json();

    return json.models.map(model =>
      Object({
        isSelected: model.isSelected === 'Y',
        version: model.version,
        recommendationStartDate: model.recommendation_start_date,
        recommendationEndDate: model.recommendation_end_date,
        dataExtractDate: model.data_extract_date,
        dataExtractSize: model.data_extract_size,
        learningStartDate: model.learning_start_date,
        learningEndDate: model.learning_end_date,
      }),
    );
  },

  callApplyModel: async ({version}) => {
    const url = DOMAIN + API_BASE_URL + `/recommendation/models/apply?`;
    const params = new URLSearchParams({
      version: version,
    }).toString();

    const res = await fetch(url + params);
    const json = await res.json();
  },

  callDeleteModel: async ({version}) => {
    const url = DOMAIN + API_BASE_URL + `/recommendation/models/${version}?`;

    const res = await fetch(url, {method: 'DELETE'});
    const json = await res.json();
  },

  getGroupsRecommendation: async ({version, groups, diningTypes}) => {
    const url = DOMAIN + API_BASE_URL + `/recommendation/recommend/by-group?`;

    const params = new URLSearchParams({
      version: version,
      groups: groups,
      dining_types: diningTypes,
    }).toString();

    const res = await fetch(url + params);
    const json = await res.json();
    return json.results.map(result =>
      Object({
        group: {id: result.group.id, name: result.group.name},
        diningTypes: result.dining_types.map(diningType =>
          Object({
            id: diningType.id,
            name: diningType.name,
            dates: diningType.dates.map(date =>
              Object({
                date: date.date,
                makers: date.makers.map(maker =>
                  Object({
                    id: maker.id,
                    name: maker.name,
                    foods: maker.foods.map(food =>
                      Object({id: food.id, name: food.name, price: food.price}),
                    ),
                  }),
                ),
              }),
            ),
          }),
        ),
      }),
    );
  },
};
