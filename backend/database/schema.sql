/* =========================================================
   Emergency Response App - SQL Server Schema
   Run this in SSMS (or sqlcmd) against a fresh database.
   ========================================================= */

IF DB_ID('EmergencyAppDB') IS NULL
BEGIN
    CREATE DATABASE EmergencyAppDB;
END
GO

USE EmergencyAppDB;
GO

/* ---------------------------------------------------------
   USERS
   --------------------------------------------------------- */
IF OBJECT_ID('dbo.users', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.users (
        id            VARCHAR(64)  NOT NULL PRIMARY KEY,
        full_name     NVARCHAR(150) NOT NULL,
        phone_number  VARCHAR(20)  NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at    DATETIME2    NOT NULL DEFAULT GETDATE()
    );
END
GO

/* ---------------------------------------------------------
   HOSPITALS
   --------------------------------------------------------- */
IF OBJECT_ID('dbo.hospitals', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.hospitals (
        id           VARCHAR(64)   NOT NULL PRIMARY KEY,
        name         NVARCHAR(150) NOT NULL,
        address      NVARCHAR(255) NULL,
        lat          FLOAT         NOT NULL,
        lng          FLOAT         NOT NULL,
        phone        VARCHAR(20)   NULL,
        is_available BIT           NOT NULL DEFAULT 1,
        created_at   DATETIME2     NOT NULL DEFAULT GETDATE()
    );
END
GO

/* ---------------------------------------------------------
   EMERGENCY REQUESTS
   --------------------------------------------------------- */
IF OBJECT_ID('dbo.emergency_requests', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.emergency_requests (
        id             VARCHAR(64)   NOT NULL PRIMARY KEY,
        user_id        VARCHAR(64)   NOT NULL,
        hospital_id    VARCHAR(64)   NULL,
        emergency_type VARCHAR(20)   NOT NULL
            CONSTRAINT CK_emergency_type CHECK (emergency_type IN ('Accident', 'Fire', 'Medical')),
        notes          NVARCHAR(500) NULL,
        lat            FLOAT         NOT NULL,
        lng            FLOAT         NOT NULL,
        status         VARCHAR(20)   NOT NULL DEFAULT 'Pending'
            CONSTRAINT CK_emergency_status CHECK (status IN ('Pending', 'Dispatched', 'Resolved')),
        created_at     DATETIME2     NOT NULL DEFAULT GETDATE(),
        updated_at     DATETIME2     NOT NULL DEFAULT GETDATE(),
        CONSTRAINT FK_emergency_user
            FOREIGN KEY (user_id) REFERENCES dbo.users(id) ON DELETE CASCADE,
        CONSTRAINT FK_emergency_hospital
            FOREIGN KEY (hospital_id) REFERENCES dbo.hospitals(id) ON DELETE SET NULL
    );

    CREATE INDEX IX_emergency_requests_user_id ON dbo.emergency_requests(user_id);
    CREATE INDEX IX_emergency_requests_status ON dbo.emergency_requests(status);
END
GO

/* ---------------------------------------------------------
   EMERGENCY CONTACTS
   --------------------------------------------------------- */
IF OBJECT_ID('dbo.emergency_contacts', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.emergency_contacts (
        id           VARCHAR(64)  NOT NULL PRIMARY KEY,
        user_id      VARCHAR(64)  NOT NULL,
        name         NVARCHAR(150) NOT NULL,
        phone_number VARCHAR(20)  NOT NULL,
        relation     NVARCHAR(50) NOT NULL,
        created_at   DATETIME2    NOT NULL DEFAULT GETDATE(),
        CONSTRAINT FK_contacts_user
            FOREIGN KEY (user_id) REFERENCES dbo.users(id) ON DELETE CASCADE
    );

    CREATE INDEX IX_emergency_contacts_user_id ON dbo.emergency_contacts(user_id);
END
GO

/* ---------------------------------------------------------
   NOTIFICATION HISTORY
   --------------------------------------------------------- */
IF OBJECT_ID('dbo.notification_history', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.notification_history (
        id         VARCHAR(64)   NOT NULL PRIMARY KEY,
        user_id    VARCHAR(64)   NOT NULL,
        title      NVARCHAR(150) NOT NULL,
        message    NVARCHAR(500) NOT NULL,
        is_read    BIT           NOT NULL DEFAULT 0,
        created_at DATETIME2     NOT NULL DEFAULT GETDATE(),
        CONSTRAINT FK_notifications_user
            FOREIGN KEY (user_id) REFERENCES dbo.users(id) ON DELETE CASCADE
    );

    CREATE INDEX IX_notification_history_user_id ON dbo.notification_history(user_id);
END
GO

/* ---------------------------------------------------------
   SEED DATA - a few Islamabad/Rawalpindi hospitals so the
   Hospital Finder module has something real to query.
   --------------------------------------------------------- */
IF NOT EXISTS (SELECT 1 FROM dbo.hospitals)
BEGIN
    INSERT INTO dbo.hospitals (id, name, address, lat, lng, phone, is_available) VALUES
    (NEWID(), 'PIMS Hospital', 'G-8/3, Islamabad', 33.6980, 73.0480, '0512851761', 1),
    (NEWID(), 'Shifa International Hospital', 'H-8/4, Islamabad', 33.6870, 72.9990, '0518464646', 1),
    (NEWID(), 'Holy Family Hospital', 'Satellite Town, Rawalpindi', 33.6320, 73.0700, '0519290311', 1),
    (NEWID(), 'CMH Rawalpindi', 'The Mall, Rawalpindi', 33.5960, 73.0490, '0519270333', 1);
END
GO
