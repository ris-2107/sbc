import {
  Box,
  Grid,
  Heading,
  HStack,
  Progress,
  Stack,
  Text
} from '@chakra-ui/react';
import React from 'react';
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { DoughnutChart, LineChart } from './Chart';
const Databox = ({ title, qty, qtyPercentage, profit }) => {
  return (
    <Box
      width={['full', '20%']}
      boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
      p="8"
      borderRadius={'lg'}
    >
      <Text children={`${title}`} />
      <HStack>
        <Text children={`${qtyPercentage}%`} />
        {profit ? (
          <RiArrowUpLine color={'green'} />
        ) : (
          <RiArrowDownLine color={'red'} />
        )}
      </HStack>
      <Text children={'Since last month'} opacity={'0.6'} />
    </Box>
  );
};

const Bar = ({ title, value, profit }) => {
  return (
    <Box py={'4'} px={['0', '20']}>
      <Heading size={'sm'} children={title} mb={'2'} />
      <HStack w={'full'} alignItems={'center'}>
        {profit ? (
          <Text children={'0%'} />
        ) : (
          <Text fontWeight={'600'} color={'red'} children={`-${value}%`} />
        )}
        <Progress
          w={'full'}
          value={profit ? value : value}
          colorScheme={profit ? 'purple' : 'red'}
        />
        <Text children={`${value > 100 ? value : 100}`} />
      </HStack>
    </Box>
  );
};
const Dashboard = () => {
  return (
    <Grid
      css={{
        cursor: `url(${cursor}), default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Box boxSizing={'border-box'} py={'16'} px={['4', '1']}>
        <Text
          textAlign={'center'}
          opacity={0.5}
          children={`Last change was on ${String(new Date()).split('G')[0]}`}
        />
        <Heading
          children={'Dashboard'}
          ml={['1', '16']}
          mb={'16'}
          textAlign={['center', 'left']}
        />

        <Stack
          direction={['column', 'row']}
          minH={'24'}
          justifyContent={'space-evenly'}
        >
          <Databox title={'Views'} qty={123} qtyPercentage={30} profit={true} />
          <Databox title={'Users'} qty={23} qtyPercentage={78} profit={true} />
          <Databox
            title={'Subscriptions'}
            qty={12}
            qtyPercentage={20}
            profit={false}
          />
        </Stack>
        <Box
          m={['0', '16']}
          borderRadius="lg"
          padding={['0', 16]}
          mt={['4', '16']}
          boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
        >
          <Heading
            textAlign={['center', 'left']}
            size={'md'}
            pt={['8', '0']}
            ml={['0', '16']}
            children={'Views Graph'}
          />
          <LineChart />
        </Box>
        <Grid templateColumns={['1fr', '2fr 1fr']}>
          <Box p={'4'}>
            <Heading
              textAlign={['center', 'left']}
              size={'md'}
              children={'Progress Bar'}
              my={'8'}
              ml={['0', '16']}
            />
            <Box>
              {/* Progress bar */}
              <Bar title="Views" value={30} profit={true} />
              <Bar title="Users" value={78} profit={true} />
              <Bar title="Subscription" value={20} profit={false} />
            </Box>
          </Box>
          <Box p={['0', '16']} boxSizing={'border-box'} py={'4'}>
            <Heading
              textAlign={'center'}
              size={'md'}
              mb={'4'}
              children={'Users'}
            />
            {/* Donut graph */}
            <DoughnutChart />
          </Box>
        </Grid>
      </Box>
      <Sidebar />
    </Grid>
  );
};

export default Dashboard;
