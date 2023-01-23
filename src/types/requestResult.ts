export type TSiteResult = {
  id: string,
  index: number,
  loadingExperience: {
    metrics: {
      CUMULATIVE_LAYOUT_SHIFT_SCORE: {
        percentile: number,
        category: string,
      },
      EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT: {
        percentile: number,
        category: string,
      },
      EXPERIMENTAL_TIME_TO_FIRST_BYTE: {
        percentile: number,
        category: string,
      },
      FIRST_CONTENTFUL_PAINT_MS: {
        percentile: number,
        category: string,
      },
      FIRST_INPUT_DELAY_MS: {
        percentile: number,
        category: string,
      },
      LARGEST_CONTENTFUL_PAINT_MS: {
        percentile: number,
        category: string,
      },
    },
    overall_category: string,
  },
  originLoadingExperience: {
    metrics: {
      CUMULATIVE_LAYOUT_SHIFT_SCORE: {
        percentile: number,
        category: string,
      },
      EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT: {
        percentile: number,
        category: string,
      },
      EXPERIMENTAL_TIME_TO_FIRST_BYTE: {
        percentile: number,
        category: string,
      },
      FIRST_CONTENTFUL_PAINT_MS: {
        percentile: number,
        category: string,
      },
      FIRST_INPUT_DELAY_MS: {
        percentile: number,
        category: string,
      },
      LARGEST_CONTENTFUL_PAINT_MS: {
        percentile: number,
        category: string,
      }
    },
    overall_category: string,
  },
  lighthouseResult: {
    audits: {},
    categories: {},
    fetchTime: string,
    lighthouseVersion: string,
    timing: {
      total: number,
    },
  },
};


export type TLoadingExperience = {
  metrics: {
    CUMULATIVE_LAYOUT_SHIFT_SCORE: {
      percentile: number,
      category: string,
    },
    EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT: {
      percentile: number,
      category: string,
    },
    EXPERIMENTAL_TIME_TO_FIRST_BYTE: {
      percentile: number,
      category: string,
    },
    FIRST_CONTENTFUL_PAINT_MS: {
      percentile: number,
      category: string,
    },
    FIRST_INPUT_DELAY_MS: {
      percentile: number,
      category: string,
    },
    LARGEST_CONTENTFUL_PAINT_MS: {
      percentile: number,
      category: string,
    },
  }
  overall_category: string,
};

export type TLighthouseResult = {
  index: number,
  data: {
    audits: {
    },
    categories: {},
    fetchTime: string,
    lighthouseVersion: string,
    timing: {
      total: number,
    },
  }
};

export type TScreenshotInfo = {
  details: {
    timestamp: number,
    timing: number,
    data: string,
    screenshot?: {
      data: string,
    }
  };
};

export interface TLightHouseResultRest {
  [parameter: string]: string | number,
};

export type TFetchError = {
  responseCode: number,
  errorDescription: string,
};

export type TThreadTaskItem = {
  duration: number,
  startTime: number,
};

export type TAuditTasksData = {
  details: {
    items: TThreadTaskItem[];
  }
};
