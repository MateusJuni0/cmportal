CREATE TABLE `agents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`role` varchar(255) NOT NULL,
	`personality` text,
	`status` enum('online','offline','training') NOT NULL DEFAULT 'offline',
	`skills` json NOT NULL,
	`avatar` varchar(512),
	`userId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `agents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `clients` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320),
	`company` varchar(255),
	`phone` varchar(20),
	`status` enum('active','trial','inactive','churned') NOT NULL DEFAULT 'active',
	`plan` enum('starter','professional','enterprise') NOT NULL DEFAULT 'starter',
	`startDate` timestamp NOT NULL DEFAULT (now()),
	`trialEndDate` timestamp,
	`monthlyValue` decimal(10,2) NOT NULL DEFAULT '0',
	`userId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `clients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cms_content` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`content` text,
	`contentType` enum('page','post','component') NOT NULL DEFAULT 'page',
	`published` boolean NOT NULL DEFAULT false,
	`userId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `cms_content_id` PRIMARY KEY(`id`),
	CONSTRAINT `cms_content_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `financial_data` (
	`id` int AUTO_INCREMENT NOT NULL,
	`date` varchar(50) NOT NULL,
	`revenue` decimal(12,2) NOT NULL DEFAULT '0',
	`costs` decimal(12,2) NOT NULL DEFAULT '0',
	`profit` decimal(12,2) NOT NULL DEFAULT '0',
	`apiCosts` decimal(12,2) NOT NULL DEFAULT '0',
	`userId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `financial_data_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `generated_content` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type` enum('image','copy','video') NOT NULL DEFAULT 'image',
	`prompt` text NOT NULL,
	`result` text,
	`status` enum('generating','completed','failed') NOT NULL DEFAULT 'generating',
	`userId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `generated_content_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `landing_pages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`template` varchar(255) NOT NULL DEFAULT 'blank',
	`content` json,
	`published` boolean NOT NULL DEFAULT false,
	`userId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `landing_pages_id` PRIMARY KEY(`id`),
	CONSTRAINT `landing_pages_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`company` varchar(255),
	`email` varchar(320),
	`phone` varchar(20),
	`score` int NOT NULL DEFAULT 0,
	`source` enum('instagram','linkedin','zaask','google','direct','other') NOT NULL DEFAULT 'direct',
	`status` enum('new','contacted','qualified','proposal','closed') NOT NULL DEFAULT 'new',
	`userId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	`level` enum('info','warning','error','success','debug') NOT NULL DEFAULT 'info',
	`message` text NOT NULL,
	`agent` varchar(255),
	`agentId` int,
	`data` json,
	`userId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `training_data` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`type` enum('pdf','url','text') NOT NULL DEFAULT 'text',
	`size` varchar(50),
	`status` enum('pending','processing','completed','error') NOT NULL DEFAULT 'pending',
	`progress` int NOT NULL DEFAULT 0,
	`content` text,
	`userId` int NOT NULL,
	`uploadedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `training_data_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
--> statement-breakpoint
CREATE TABLE `whatsapp_accounts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`phoneNumber` varchar(20) NOT NULL,
	`status` enum('active','warming','limited','banned') NOT NULL DEFAULT 'active',
	`messagesSent` int NOT NULL DEFAULT 0,
	`messagesReceived` int NOT NULL DEFAULT 0,
	`warmingProgress` int NOT NULL DEFAULT 0,
	`lastActivity` timestamp NOT NULL DEFAULT (now()),
	`userId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `whatsapp_accounts_id` PRIMARY KEY(`id`),
	CONSTRAINT `whatsapp_accounts_phoneNumber_unique` UNIQUE(`phoneNumber`)
);
