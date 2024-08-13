import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];

export const categories = [
  {
    label: "Historical Sites",
    value: "historical_sites",
  },
  {
    label: "National Parks",
    value: "national_parks",
  },
  {
    label: "Resorts",
    value: "resorts",
  },
  {
    label: "Conservation Areas",
    value: "conservation_areas",
  },
  {
    label: "Art Galleries",
    value: "art_galleries",
  },
  {
    label: "Cultural Centers",
    value: "cultural_centers",
  },
  {
    label: "Beaches",
    value: "beaches",
  },
  {
    label: "Mountains and Hills",
    value: "mountains_and_hills",
  },
  {
    label: "Waterfalls",
    value: "waterfalls",
  },
  {
    label: "Lakes and Rivers",
    value: "lakes_and_rivers",
  },
  {
    label: "Botanical Gardens",
    value: "botanical_gardens",
  },
  {
    label: "Wildlife Sanctuaries",
    value: "wildlife_sanctuaries",
  },
  {
    label: "Adventure Parks",
    value: "adventure_parks",
  },
  {
    label: "Heritage Sites",
    value: "heritage_sites",
  },
  {
    label: "Religious Sites",
    value: "religious_sites",
  },
  {
    label: "Architectural Marvels",
    value: "architectural_marvels",
  },
  {
    label: "Markets",
    value: "markets",
  },
  {
    label: "Festivals and Events",
    value: "festivals_and_events",
  },
];
