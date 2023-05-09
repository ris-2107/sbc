import { Button, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  RiAddCircleFill,
  RiDashboardFill,
  RiIeFill,
  RiUser3Fill,
} from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <VStack
      spacing={'8'}
      p={'16'}
      boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
    >
      <LinkButton
        url={'dashboard'}
        Icon={RiDashboardFill}
        text="Dashboard"
        isActive={location.pathname === '/admin/dashboard'}
      />
      <LinkButton
        url={'createcourse'}
        Icon={RiAddCircleFill}
        text="Create Course"
        isActive={location.pathname === '/admin/createcourse'}
      />
      <LinkButton
        url={'courses'}
        Icon={RiIeFill}
        text="Courses"
        isActive={location.pathname === `/admin/courses`}
      />
      <LinkButton
        url={'users'}
        Icon={RiUser3Fill}
        text="Users"
        isActive={location.pathname === '/admin/users'}
      />
    </VStack>
  );
};

export default Sidebar;

function LinkButton({ url, Icon, text, isActive }) {
  return (
    <Link to={`/admin/${url}`}>
      <Button
        fontSize={'larger'}
        variant={'ghost'}
        colorScheme={isActive ? 'purple' : ''}
      >
        <Icon style={{ margin: '6px' }} />
        {text}
      </Button>
    </Link>
  );
}
