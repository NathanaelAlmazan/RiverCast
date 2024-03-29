"use client";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import BlogDetailHeader from "./BlogDetailHeader";
import BlogDetailContent from "./BlogDetailContent";
import OfficeCultureCard from "./OfficeCultureCard";
import LearningItem from "./MyLearning";
import CityInfo from "./CityInfo";

export default function About() {
    return (
        <Grid container spacing={5}>
            <Grid item xs={12}>
                <BlogDetailHeader 
                    title="RiverCast: Forecasting Marikina River Level using Auto-Regressive Transformer" 
                    blogDetailHeader={[
                        {
                            id: 1,
                            icon: "BiUserCircle",
                            title: "Nathanael Almazan",
                        },
                        {
                            id: 2,
                            icon: "BiUserCircle",
                            title: "Paolo Miguel Morato",
                        },
                        {
                            id: 3,
                            icon: "BiUserCircle",
                            title: "Jordan Garcia",
                        },
                        {
                            id: 4,
                            icon: "BiUserCircle",
                            title: "Shaina Marie Laman",
                        }
                    ]}
                />
            </Grid>
            <Grid item xs={12} md={9}>
                <Stack spacing={5}>
                    <BlogDetailContent />
                    <CityInfo />
                </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
                <Stack spacing={3}>
                    <OfficeCultureCard />
                    <LearningItem />
                </Stack>
            </Grid>
        </Grid>
    )
}