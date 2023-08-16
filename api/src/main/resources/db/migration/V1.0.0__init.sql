create table if not exists landing
(
    id          bigint auto_increment
    primary key,
    create_time datetime(6)  null,
    key_        varchar(255) null,
    name        varchar(255) null,
    url         varchar(255) null,
    constraint UK_iakrfrh73ukfl5sox9w7ncumx
    unique (key_)
    );

create table if not exists setting
(
    id    bigint auto_increment
    primary key,
    key_  varchar(255) null,
    value varchar(255) null,
    constraint UK_cedhdqo3np4pcjajki49heix
    unique (key_)
    );

create table if not exists user
(
    id       bigint auto_increment
    primary key,
    password varchar(255) null,
    username varchar(255) null,
    name     varchar(255) null
    );

