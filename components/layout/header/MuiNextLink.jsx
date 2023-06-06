import React from "react";
import NextLink from "next/link";
import MuiLink from "@mui/material/Link";
import { useRouter } from "next/router";
import clsx from "clsx";

export const NextLinkComposed = React.forwardRef(function NextLinkComposed(
  props,
  ref
) {
  const {
    to,
    linkAs,
    href,
    replace,
    scroll,
    passHref,
    shallow,
    prefetch,
    locale,
    styleClass,
    label,
    ...other
  } = props;
  const handleClick = (event) => {
    //jsonDT.UpdateMenuLinkClicked(label);
  };
  return (
    <NextLink
      href={to}
      replace={replace}
      scroll={scroll}
      passHref={passHref}
      shallow={shallow}
      prefetch={prefetch}
      as={linkAs}
      locale={locale}
      label={label}
    >
      <a ref={ref} {...other} onClick={handleClick} className={styleClass} />
    </NextLink>
  );
});

const Link = React.forwardRef(function Link(props, ref) {
  const {
    activeClassName = "Navbar",
    as: linkAs,
    className: classNameProps,
    href,
    noLinkStyle,
    role,
    label,
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof href === "string" ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  const isExternal =
    typeof href === "string" &&
    (href.indexOf("http") === 0 || href.indexOf("mailto:") === 0);

  if (isExternal) {
    if (noLinkStyle) {
      return <a className={className} href={href} ref={ref} {...other} />;
    }

    return <MuiLink className={className} href={href} ref={ref} {...other} />;
  }

  if (noLinkStyle) {
    return (
      <NextLinkComposed className={className} ref={ref} to={href} {...other} />
    );
  }

  return (
    <MuiLink
      component={NextLinkComposed}
      linkAs={linkAs}
      className={className}
      ref={ref}
      to={href}
      label={label}
      {...other}
    />
  );
});

export default Link;
