import { Factory, Wrench, Settings, Zap, Shield, Truck, Ruler, HardHat, Hammer, Construction, Box, Layers, Activity, Snowflake, Flame, Droplets, Wind, Building2, ShieldCheck } from "lucide-react";

export const IconMap: Record<string, any> = {
  Factory,
  Wrench,
  Settings,
  Zap,
  Shield,
  Truck,
  Ruler,
  HardHat,
  Hammer,
  Construction,
  Box,
  Layers,
  Activity,
  Snowflake,
  Flame,
  Droplets,
  Wind,
  Building2,
  ShieldCheck
};

interface IconProps {
  name: string;
  className?: string;
}

export default function Icon({ name, className }: IconProps) {
  const IconComponent = IconMap[name] || Factory; // Default to Factory
  return <IconComponent className={className} />;
}
