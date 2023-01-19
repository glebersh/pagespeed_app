export type SiteResult = {
  id: string,
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
    timing: {},
  },
};


export type LoadingExperience = {
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

export type LighthouseResult = {
  data: {
    audits: {},
    categories: {},
    fetchTime: string,
    lighthouseVersion: string,
    timing: {},
  }
};