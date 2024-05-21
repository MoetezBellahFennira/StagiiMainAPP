import { Avatar, Button, SimpleGrid, Title } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router';

interface Props { }

const data = [
  { id: 0, companyName: '  developpement system information', secteur: 'Inforamtique' },
  { id: 0, companyName: 'mecanique', secteur: 'Mecanique' },
  { id: 0, companyName: 'multimedia et developpement web', secteur: 'informatique' },
  { id: 0, companyName: 'electrique', secteur: 'electrique' },
  { id: 0, companyName: 'réseau et system information', secteur: 'informatique' },
  { id: 0, companyName: 'system embarqué', secteur: 'informatique' },
];

const Companies = (props: Props) => {
  return (
    <div>
      <Title order={2} className='mb-4'>
        Class
      </Title>
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: 'xl', cols: 4, spacing: 'md' },
          { maxWidth: 'lg', cols: 3, spacing: 'md' },
          { maxWidth: 'md', cols: 2, spacing: 'md' },
          { maxWidth: 'sm', cols: 1, spacing: 'sm' },
          { maxWidth: 'xs', cols: 1, spacing: 'sm' },
        ]}
      >
        {data.map((companies) => (
          <CompanyCard
            id={companies.id}
            companyName={companies.companyName}
            secteur={companies.secteur}
          />
        ))}
      </SimpleGrid>
    </div>
  );
};

interface CompanyCardProps {
  id: Number;
  companyName: string;
  secteur: string;
}

const CompanyCard = (props: CompanyCardProps) => {
  const navigate = useNavigate();
  return (
    <div className='bg-white shadow p-6 flex flex-col items-center'>
      <Avatar size={120} className='rounded-full' />
      <div className='mt-2 mb-1 font-semibold text-2xl'>{props.companyName}</div>
      <div className='mb-3 text-gray-500'>{props.secteur}</div>
      <Button
        variant={'outline'}
        onClick={() => navigate('/company/profile/' + props.id)}
      >
        View Class
      </Button>
    </div>
  );
};

export default Companies;
