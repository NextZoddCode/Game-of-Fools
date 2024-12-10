
import Character from '@/core/shared/Character';
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';


export default function CharacterGraph({ previewCharacter }: { previewCharacter: Character | null }) {

    const data = [
        {
            subject: 'Strength',
            A: previewCharacter?.strength,
            fullMark: 10,
        },
        {
            subject: 'Defense',
            A: previewCharacter?.defense,
            fullMark: 10,
        },
        {
            subject: 'Luck',
            A: previewCharacter?.luck,
            fullMark: 10,
        },
        {
            subject: 'Speed',
            A: previewCharacter?.speed,
            fullMark: 10,
        }
    ];

    return (
        <ResponsiveContainer width="100%" height="25%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
        </ResponsiveContainer>
    );
}